import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';

import { HealthProcedures } from '@controllers/HealthProcedures';
import requireAuth from '@middleware/authMiddleware';
import { configMulter } from '@config/multerConfig';

const healthProcedures = new HealthProcedures();

const upload = multer(configMulter);

const healthProceduresRoutes = Router();

healthProceduresRoutes.get(
  '/get-procedures-user/:userId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().required(),
    }),
  }),
  healthProcedures.getAllHealthProceduresUser,
);

healthProceduresRoutes.get(
  '/get-procedure-user/:procedureId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      procedureId: Joi.string().required(),
    }),
  }),
  healthProcedures.getDetailsProcedure,
);

healthProceduresRoutes.post(
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
  healthProcedures.saveHealthProcedures,
);

healthProceduresRoutes.delete(
  '/delete-procedure/:procedureId',
  requireAuth,
  celebrate({
    params: Joi.object().keys({
      procedureId: Joi.string().required(),
    }),
  }),
  healthProcedures.deleteHealthProcedures,
);

healthProceduresRoutes.patch(
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
  healthProcedures.editHealthProcedures,
);

export default healthProceduresRoutes;
