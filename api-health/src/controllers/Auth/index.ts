import { Request, Response } from 'express';
import { keyUserLoggedIn } from 'src/constants';

import connection from 'src/database/connection';
import { IUsers } from 'src/interfaces';
import { saveCache, deleteCache } from 'src/modules/cache';

import {
  buildKeyUserLoggedInForCache,
  comparePwd,
  generateTokenOfAuthentication,
} from 'src/utils/AuthUtils';
import { buildMessageFeedback } from 'src/utils/MessageFeedback';

const UserConnection = <T>() => connection<T>('users as u');

class AuthController {
  async authUser(req: Request, res: Response) {
    const { email: mail, password: pwd } = req.body;

    const [user]: IUsers[] = await UserConnection<IUsers[]>()
      .select('u.*', 'f.title_storage')
      .where('u.email', '=', mail)
      .leftJoin('files as f', 'u.avatar_id', 'f.files_id');

    if (!user) {
      return res.status(401).json(
        buildMessageFeedback({
          msg: 'E-mail ou senha não estão corretas.',
          type: 'error',
        }),
      );
    }

    if (!user.email) {
      return res.status(401).json(
        buildMessageFeedback({
          msg: 'E-mail ou senha não estão corretas.',
          type: 'error',
        }),
      );
    }

    const passwordIsNotEquals = !(await comparePwd(pwd, user.password));

    if (passwordIsNotEquals) {
      return res.status(401).json(
        buildMessageFeedback({
          msg: 'E-mail ou senha não estão corretas.',
          type: 'error',
        }),
      );
    }

    const {
      avatar_id,
      create_date,
      email,
      name,
      user_id,
      phone,
      title_storage,
    } = user;

    const token = generateTokenOfAuthentication(user_id);

    const valuesUser = {
      userId: user_id,
      phone,
      avatarId: avatar_id,
      create_date: new Date(create_date),
      email,
      name,
      title_storage,
      token,
    };

    saveCache(
      buildKeyUserLoggedInForCache(user.user_id, keyUserLoggedIn),
      valuesUser,
    );

    return res.status(200).json({
      msg: `Seja bem-vindo ${user.name}.`,
      type: 'success',
      user: valuesUser,
    });
  }

  async disconnectUser(req: Request, res: Response) {
    const { userId } = req.params;

    deleteCache(buildKeyUserLoggedInForCache(Number(userId), keyUserLoggedIn));

    return res.status(200).json(
      buildMessageFeedback({
        msg: `Até logo...`,
        type: 'success',
      }),
    );
  }
}

export { AuthController };
