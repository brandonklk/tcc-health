import { Response } from 'express';

import { IAuth } from '@interfaces/index';
import { buildMessageFeedback } from '@utils/MessageFeedback';
import { findOneUserByMail } from '@models/UserModel';
import {
  buildKeyUserLoggedInForCache,
  comparePwd,
  generateTokenOfAuthentication,
} from '@utils/AuthUtils';
import { saveCache } from '@modules/cache';
import { keyUserLoggedIn } from '@constante/index';

export const authService = async (authUser: IAuth, res: Response) => {
  if (authUser && Object.keys(authUser).length === 0) {
    return res.status(401).json(
      buildMessageFeedback({
        msg: 'Nenhuma informação fornecida, por favor informe o e-mail e senha',
        type: 'error',
      }),
    );
  }

  if (!authUser.email) {
    return res.status(401).json(
      buildMessageFeedback({
        msg: 'E-mail ou senha não estão corretas.',
        type: 'error',
      }),
    );
  }

  if (!authUser.password) {
    return res.status(401).json(
      buildMessageFeedback({
        msg: 'E-mail ou senha não estão corretas.',
        type: 'error',
      }),
    );
  }

  const user = await findOneUserByMail(authUser.email);

  if (!user) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Nenhum usuário encontrato com os valores fornecidos.',
        type: 'error',
      }),
    );
  }

  const passwordIsNotEquals = !(await comparePwd(
    authUser.password,
    user.password,
  ));

  if (passwordIsNotEquals) {
    return res.status(401).json(
      buildMessageFeedback({
        msg: 'E-mail ou senha não estão corretas.',
        type: 'error',
      }),
    );
  }

  const { avatar_id, create_date, email, name, user_id, phone, title_storage } =
    user;

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

  saveCache(buildKeyUserLoggedInForCache(user_id, keyUserLoggedIn), valuesUser);

  return res.status(200).json({
    msg: `Seja bem-vindo ${user.name}.`,
    type: 'success',
    user: valuesUser,
  });
};
