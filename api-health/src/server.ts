import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import routes from './routes';
import { celebrate, errors, Joi } from 'celebrate';
import { log } from '@logs/log';
import { valueDotEnvIsBoolean } from '@utils/EnvUtils';

const app = express();

if (valueDotEnvIsBoolean(process.env.DEBUG_REQUEST)) {
  app.use(pinoHttp({ logger: log }));
}

app.use(cors());
app.use('/files', express.static('files'));
/**
 * app.use([
 *  ensureAuthenticated,
 *  express.static(express.static('files')),
 * ]);
 * */

app.use(express.json());
app.use(routes);

app.use(errors());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => log.info(`Server running port ${PORT}`));

export default app;
