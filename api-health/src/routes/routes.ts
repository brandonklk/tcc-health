import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';

import multerConfig from 'src/config/multer';

import { UserController } from '@controllers/User';
import { AuthController } from '@controllers/Auth';
import { MedProcedures } from '@controllers/MedProcedures';

import { log } from '../logger/log';
import requireAuth from 'src/middleware/authMiddleware';

const userController = new UserController();
const userAuth = new AuthController();
const documentsController = new MedProcedures();

const routes = express.Router();
const upload = multer(multerConfig);

// Inicio usuários

routes.get('/get-users', requireAuth, userController.getUsers);

routes.post(
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

routes.patch(
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

routes.get(
  '/get-user/:userId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  userController.getUser,
);

routes.post(
  '/auth',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  userAuth.authUser,
);

routes.patch(
  '/disconnect',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  userAuth.disconnectUser,
);

// Fim usuários

// Inicio documentos

routes.get(
  '/get-procedures-user/:userId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  documentsController.getAllHealthProceduresUser,
);

routes.get(
  '/get-procedure-user/:procedureId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      procedureId: Joi.string().required(),
    }),
  }),
  documentsController.getDetailsProcedure,
);

routes.post(
  '/save-procedure',
  requireAuth,
  upload.array('files_procedures', 10),
  celebrate({
    body: Joi.object()
      .keys({
        title: Joi.string().required(),
        type_procedures: Joi.number().required(),
        description: Joi.string().required(),
        user_id: Joi.number().required(),
      })
      .unknown(true),
  }),
  documentsController.saveMedProcedures,
);

routes.delete(
  '/delete-procedure/:procedureId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      procedureId: Joi.string().required(),
    }),
  }),
  documentsController.deleteMedProcedures,
);

routes.patch(
  '/edit-procedure',
  requireAuth,
  upload.single('procedure_doc'),
  celebrate({
    body: Joi.object().keys({
      procedureId: Joi.number().required(),
      title: Joi.string().required(),
      typeProcedures: Joi.number().required(),
      description: Joi.string().required(),
    }),
  }),
  documentsController.editMedProcedures,
);

// Fim documentos

export default routes;
