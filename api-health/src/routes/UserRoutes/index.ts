import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import { UserController } from '@controllers/User';
import { configMulter } from '@config/multerConfig';
import requireAuth from '@middleware/authMiddleware';

const userController = new UserController();

const upload = multer(configMulter);

const userRoutes = Router();

userRoutes.get('/get-users', userController.getUsers);

userRoutes.post(
  '/create-user',
  upload.single('avatar'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().max(15).min(8),
      phone: Joi.string().max(13),
      role: Joi.string().required(),
      language: Joi.string().required(),
      avatar: Joi.string(),
    }),
  }),
  userController.createUser,
);

userRoutes.patch(
  '/edit-user',
  requireAuth,
  upload.single('avatar'),
  celebrate({
    body: Joi.object()
      .keys({
        userId: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string(),
        phone: Joi.number(),
        language: Joi.string(),
      })
      .unknown(true),
  }),
  userController.editUser,
);

userRoutes.get(
  '/get-user/:userId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  userController.getUser,
);

export default userRoutes;
