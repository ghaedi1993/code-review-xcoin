import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { apiLimiter, errorHandler, requestLoggerBuilder } from './middlewares';

import { CORS_ORIGINS } from './config';

const app = express();
app.set('trust proxy', true);
app.use(apiLimiter);
app.use(requestLoggerBuilder());
app.use(cors({ origin: CORS_ORIGINS }));
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routes);

app.use(errorHandler);

export default app;
