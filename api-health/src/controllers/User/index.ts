import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import multer from 'multer';

import connection from 'src/database/connection';

import { keyUserCache, keyUserLoggedIn } from 'src/constants';

import { IUsers } from 'src/interfaces';

import { buildMessageFeedback } from 'src/utils/MessageFeedback';
import {
  buildKeyUserLoggedInForCache,
  encryptedPwd,
} from 'src/utils/AuthUtils';
import multerConfig from 'src/config/multer';

import { log } from 'src/logger/log';

import { emailUserExist } from '@utils/UserUtils';
import { buildDateCurrent } from '@utils/DateUtils';
import { insertFileAndGetIdFile } from '@utils/FilesUtils';

import { getCache, hasCache, saveCache } from 'src/modules/cache';

const upload = multer(multerConfig);

const UserConnection = () => connection<IUsers>('users as u');

const cacheUser = new NodeCache({ stdTTL: 0, checkperiod: 0 });

const getValueAllUserForCache = async () => {
  return await UserConnection()
    .select(
      'u.user_id as userId',
      'u.name',
      'u.email',
      'u.phone',
      'u.avatar_id as avatarId',
      'f.title_storage',
    )
    .leftJoin('files as f', 'u.avatar_id', 'f.files_id');
};

class UserController {
  async getUsers(request: Request, response: Response) {
    if (cacheUser.has(keyUserCache)) {
      return response.json(cacheUser.get(keyUserCache));
    }

    const allUser: IUsers[] = await getValueAllUserForCache();

    cacheUser.del(keyUserCache);
    cacheUser.set<IUsers[]>(keyUserCache, allUser);

    return response.json(allUser);
  }

  async createUser(request: Request, response: Response) {
    const { name, email, password: pwd, phone } = request.body;

    try {
      const allEmailUser: IUsers[] = await UserConnection()
        .select('u.email')
        .where({ email });

      const emailExist = emailUserExist(allEmailUser, email);

      if (emailExist) {
        return response.status(500).json(
          buildMessageFeedback({
            msg: 'O e-mail informado já esta em uso. Por favor informe outro',
            type: 'error',
          }),
        );
      }

      const password = await encryptedPwd(pwd);
      const create_date = buildDateCurrent();
      let avatar_id = null;

      if (request.file) {
        avatar_id = await insertFileAndGetIdFile(request, response);

        if (avatar_id === 0) {
          return response.status(500).json(
            buildMessageFeedback({
              msg: 'Não foi possivel salvar o avatar do usuário.',
              type: 'error',
            }),
          );
        }
      }

      await connection.transaction(async trx => {
        try {
          await UserConnection()
            .transacting(trx)
            .insert({ name, email, password, phone, avatar_id, create_date });

          await trx.commit();
        } catch (error) {
          await trx.rollback();
        }
      });

      const allUserForCache = await getValueAllUserForCache();

      cacheUser.del(keyUserCache);
      cacheUser.set(keyUserCache, allUserForCache);

      return response.json(
        buildMessageFeedback({
          msg: 'Usuário criado com sucesso.',
          type: 'success',
        }),
      );
    } catch (error) {
      log.error(`Não foi possivel criar usuário `, error);
      return response.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel criar o usuário.',
          type: 'error',
        }),
      );
    }
  }

  async editUser(request: Request, response: Response) {
    const { userId, name, email, password, phone } = request.body;

    try {
      let pwd: string | undefined;

      if (password !== 'null') {
        pwd = await encryptedPwd(password);
      }

      let avatar_id = null;
      if (request.file) {
        avatar_id = await insertFileAndGetIdFile(request, response);

        if (avatar_id === 0) {
          return response.status(500).json(
            buildMessageFeedback({
              msg: 'Não foi possivel salvar o avatar do usuário.',
              type: 'error',
            }),
          );
        }
      }

      await connection.transaction(async trx => {
        const valuesUserUpdate = {
          name,
          email,
          password: pwd,
          phone,
          avatar_id,
        };

        try {
          await UserConnection()
            .transacting(trx)
            .where({ 'u.user_id': userId })
            .update(valuesUserUpdate);

          await trx.commit();
        } catch (error) {
          await trx.rollback();
        }
      });

      const allUserForCache: IUsers[] = await getValueAllUserForCache();

      cacheUser.del(keyUserCache);
      cacheUser.set(keyUserCache, allUserForCache);

      const {
        user_id,
        name,
        email,
        phone,
        create_date,
        avatarId,
        title_storage,
      } = await UserConnection()
        .select(
          'u.user_id',
          'u.name',
          'u.email',
          'u.phone',
          'u.create_date',
          'u.avatar_id as avatarId',
          'f.title_storage',
        )
        .leftJoin('files as f', 'u.avatar_id', 'f.files_id')
        .where({ 'u.user_id': userId })
        .first();

      return response.json({
        msg: 'Usuário editado com sucesso.',
        type: 'success',
        user: {
          userId: user_id,
          name,
          email,
          phone,
          create_date: new Date(create_date),
          avatarId,
          title_storage,
        },
      });
    } catch (error) {
      log.error(error, 'Não foi possivel editado o usuário.');
      return response.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel editado o usuário.',
          type: 'error',
        }),
      );
    }
  }

  async getUser(request: Request, response: Response) {
    const { userId: user_id } = request.params;

    try {
      if (
        hasCache(buildKeyUserLoggedInForCache(Number(user_id), keyUserLoggedIn))
      ) {
        const valueUserCache: IUsers = getCache(
          buildKeyUserLoggedInForCache(Number(user_id), keyUserLoggedIn),
        );

        if (valueUserCache && Object.keys(valueUserCache).length > 0) {
          return response.json(valueUserCache);
        }
      }

      const user: IUsers = await UserConnection()
        .select('u.user_id', 'u.name', 'u.email', 'u.phone', 'u.avatar_id')
        .where({ user_id })
        .first();

      if (user && Object.keys(user).length > 0) {
        saveCache(
          buildKeyUserLoggedInForCache(Number(user_id), keyUserLoggedIn),
          user,
        );
      } else {
        return response.status(500).json(
          buildMessageFeedback({
            msg: 'Nenhum usuário encontrato.',
            type: 'error',
          }),
        );
      }

      return response.json(user);
    } catch (error) {
      console.log(error);
      return response.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel obter as informações do usuário.',
          type: 'error',
        }),
      );
    }
  }
}

export { UserController };
