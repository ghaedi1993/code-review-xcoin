import app from './app';
import { PORT } from './config';
import logger from './utils/logger';
import mongoFactory from './db';

mongoFactory.then(() => {
  app.listen(PORT, () => logger.info(`✅  Ready on port http://localhost:${PORT}`));
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
  );
  process.on('uncaughtException', (err) => logger.error('uncaughtException :', err));
});
