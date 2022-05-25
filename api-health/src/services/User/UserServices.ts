import { Response } from 'express';

import { IEditUser, INewUser, IUsers } from '@interfaces/index';
import { buildMessageFeedback } from '@utils/MessageFeedback';
import {
  findManyUserByMail,
  findOneUserById,
  getAllUsers,
  insertNewUser,
  updateUser,
} from '@models/UserModel';
import { emailUserExist, getValuesUserCache } from '@utils/UserUtils';
import { buildKeyUserLoggedInForCache, encryptedPwd } from '@utils/AuthUtils';
import { buildDateCurrent } from '@utils/DateUtils';
import { insertFileAndGetIdFile } from '@models/FilesModel';
import {
  FIVE_MINUTES_IN_SECONDS,
  keyUserCache,
  keyUserLoggedIn,
} from '@constante/index';
import { log } from '@logs/log';
import { deleteCache, getCache, hasCache, saveCache } from '@modules/cache';

export const createUserService = async (
  valuesNewUser: INewUser,
  res: Response,
) => {
  const { email, name, password, phone, avatar } = valuesNewUser;

  if (!email) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Informe o e-mail',
        type: 'error',
      }),
    );
  }

  if (!name) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Informe o nome',
        type: 'error',
      }),
    );
  }

  if (!password) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Informe a senha',
        type: 'error',
      }),
    );
  }

  const mailUserExist = await findManyUserByMail(email);

  const emailExist = emailUserExist(mailUserExist, email);

  if (emailExist) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'O e-mail informado já esta em uso. Por favor informe outro',
        type: 'error',
      }),
    );
  }

  const pwdEncrypted = await encryptedPwd(password);
  const create_date = buildDateCurrent();
  let avatarId = null;

  if (avatar) {
    avatarId = await insertFileAndGetIdFile(avatar);

    if (avatarId === 0) {
      return res.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel salvar o avatar do usuário.',
          type: 'error',
        }),
      );
    }
  }

  const valueUser = {
    name,
    email,
    password: pwdEncrypted,
    avatar_id: avatarId,
    phone,
    create_date,
  };

  try {
    const insertUserSuccess = await insertNewUser(valueUser);

    if (!insertUserSuccess) {
      return res.status(500).json(
        buildMessageFeedback({
          msg: 'Ocorreu um erro para criar o usuário',
          type: 'error',
        }),
      );
    }

    const allUser = await getAllUsers();

    deleteCache(keyUserCache);
    saveCache(keyUserCache, allUser, FIVE_MINUTES_IN_SECONDS);

    return res.json(
      buildMessageFeedback({
        msg: 'Usuário criado com sucesso.',
        type: 'success',
      }),
    );
  } catch (error) {
    log.error(`Não foi possivel criar usuário `, error);
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Não foi possivel criar o usuário.',
        type: 'error',
      }),
    );
  }
};

export const getAllUsersService = async (res: Response) => {
  try {
    if (hasCache(keyUserCache)) {
      return res.json(getCache(keyUserCache));
    }

    const allUser = await getAllUsers();

    deleteCache(keyUserCache);
    saveCache(keyUserCache, allUser, FIVE_MINUTES_IN_SECONDS);

    return res.json(allUser);
  } catch (error) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Não foi possivel obter os usuários.',
        type: 'error',
      }),
    );
  }
};

export const editUserService = async (
  valuesEditUser: IEditUser,
  res: Response,
) => {
  const { email, name, password, phone, avatar, userId } = valuesEditUser;

  if (!email) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Informe o e-mail',
        type: 'error',
      }),
    );
  }

  if (!name) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Informe o nome',
        type: 'error',
      }),
    );
  }

  if (!password) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Informe a senha',
        type: 'error',
      }),
    );
  }

  if (!userId) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'O id do usuário não foi informado',
        type: 'error',
      }),
    );
  }

  let pwd: string | undefined;

  if (password !== 'null') {
    pwd = await encryptedPwd(password);
  }

  let avatarId = null;

  if (avatar) {
    avatarId = await insertFileAndGetIdFile(avatar);

    if (avatarId === 0) {
      return res.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel salvar o avatar do usuário.',
          type: 'error',
        }),
      );
    }
  }

  const valuesUserInUpdate: IEditUser = {
    email,
    name,
    password: pwd,
    phone,
    avatar_id: avatarId,
    user_id: userId,
  };

  try {
    const resultUpdateUser = await updateUser(valuesUserInUpdate);

    if (!resultUpdateUser) {
      return res.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel salvar as informações do usuário.',
          type: 'error',
        }),
      );
    }

    const allUser = await getAllUsers();

    deleteCache(keyUserCache);
    saveCache(keyUserCache, allUser, FIVE_MINUTES_IN_SECONDS);

    const { create_date, ...rest } = getValuesUserCache(userId);

    return res.json({
      msg: 'Usuário editado com sucesso.',
      type: 'success',
      user: {
        ...rest,
        create_date: new Date(create_date),
      },
    });
  } catch (error) {
    log.error(error, 'Não foi possivel editado o usuário.');
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Não foi possivel editado o usuário.',
        type: 'error',
      }),
    );
  }
};

export const getUser = async (userId: number, res: Response) => {
  const keyUserLogged = buildKeyUserLoggedInForCache(userId, keyUserLoggedIn);

  if (hasCache(keyUserLogged)) {
    const valueUserCache: IUsers = getCache(keyUserLogged);

    if (valueUserCache && Object.keys(valueUserCache).length > 0) {
      return res.json(valueUserCache);
    }
  }

  const column = [
    'u.user_id as userId',
    'u.name',
    'u.email',
    'u.phone',
    'u.create_date',
    'u.avatar_id as avatarId',
    'f.title_storage',
  ];

  try {
    const user = await findOneUserById(userId, column);

    deleteCache(keyUserLogged);
    saveCache(keyUserLogged, user);

    return res.json(user);
  } catch (error) {
    log.error(error, 'Não foi possivel obter as informações do usuário.');
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Não foi possivel obter as informações do usuário.',
        type: 'error',
      }),
    );
  }
};
