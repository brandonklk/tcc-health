import { Request, Response } from 'express';
import { IEditUser, INewUser, IUsers } from '@interfaces/index';

import {
  createUserService,
  editUserService,
  getAllUsersService,
  getUser,
} from '@services/User/UserServices';

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
    const { userId, name, email, password, phone, avatarId } = request.body;

    const valueUserInEdition: IEditUser = {
      userId,
      name,
      email,
      password,
      phone,
      avatarId,
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
