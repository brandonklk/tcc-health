import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { AuthController } from '@controllers/Auth';

const authController = new AuthController();

const authRoutes = Router();

authRoutes.post(
  '/auth',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  authController.authUser,
);

authRoutes.patch(
  '/disconnect',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  authController.disconnectUser,
);

export default authRoutes;
