import winston from 'winston';
import { NODE_ENV } from '../config';
const {
  format: { json, timestamp, combine },
} = winston;
const levels = {
  error: 0,
  http: 1,
  info: 2,
};
const logger = winston.createLogger({
  levels,
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({
      filename: 'logs/requests.log',
      level: 'http',
    }),
  ],
});
if (NODE_ENV == 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
