import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import multer from 'multer';

import connection from '@db/connection';

import { keyUserCache, keyUserLoggedIn } from '@constante/index';

import { IEditUser, INewUser, IUsers } from '@interfaces/index';

import { buildMessageFeedback } from '@utils/MessageFeedback';
import { buildKeyUserLoggedInForCache, encryptedPwd } from '@utils/AuthUtils';
import { configMulter } from '@config/multerConfig';

import { log } from '@logs/log';

import { emailUserExist } from '@utils/UserUtils';
import { buildDateCurrent } from '@utils/DateUtils';
import { insertFileAndGetIdFile } from '@utils/FilesUtils';

import { getCache, hasCache, saveCache } from '@modules/cache';
import {
  createUserService,
  editUserService,
  getAllUsersService,
  getUser,
} from '@services/User/UserServices';

const upload = multer(configMulter);

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
    const users = getAllUsersService(response);

    return users;
  }

  async createUser(request: Request, response: Response) {
    const { name, email, password, phone } = request.body;

    const valuesNewUser: INewUser = {
      name,
      email,
      password,
      phone,
      avatar: request.file,
    };

    const resultUserCreate = await createUserService(valuesNewUser, response);

    return resultUserCreate;
  }

  async editUser(request: Request, response: Response) {
    const { userId, name, email, password, phone } = request.body;

    const valueUserInEdition: IEditUser = {
      userId,
      name,
      email,
      password,
      phone,
      avatar: request.file,
    };

    const resultUserEdition = await editUserService(
      valueUserInEdition,
      response,
    );

    return resultUserEdition;
  }

  async getUser(request: Request, response: Response) {
    const { userId } = request.params;

    const user = await getUser(Number(userId), response);

    return user;
  }
}

export { UserController };
