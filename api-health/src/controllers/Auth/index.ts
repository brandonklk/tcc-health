import { Request, Response } from 'express';
import { keyUserLoggedIn } from '@constante/index';

import { IAuth } from '@interfaces/index';
import { deleteCache } from '@modules/cache';

import { buildKeyUserLoggedInForCache } from '@utils/AuthUtils';
import { buildMessageFeedback } from '@utils/MessageFeedback';
import { authService } from '@services/Auth/AuthServices';

class AuthController {
  async authUser(req: Request, res: Response) {
    const { email: mail, password } = req.body;

    const valueUserAuth: IAuth = {
      email: mail || '',
      password: password || '',
    };

    const userAuth = await authService(valueUserAuth, res);

    return userAuth;
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
