import { Router } from 'express';

import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';
import HealthProceduresRoutes from './HealthProceduresRoutes';

const routes = Router();

routes.use(UserRoutes);
routes.use(AuthRoutes);
routes.use(HealthProceduresRoutes);

export default routes;
