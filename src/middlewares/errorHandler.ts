import { logger,buildError } from '../utils';

export function errorHandler(err, req, res, next) {
  logger.error(JSON.stringify(err));
  const error = buildError(err);
  res.status(error.code).json({ error });
}
