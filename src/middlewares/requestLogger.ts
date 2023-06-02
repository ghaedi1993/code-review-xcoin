import morgan from 'morgan';
import moment from 'moment';
import { logger } from '../utils';

const stream = {
  write: (message: any) => logger.http(message),
};
morgan.token('date', (req, res) => {
  return moment.utc().format();
});
morgan.token('url', (req, res) => {
  const urlWithoutQuery = req['originalUrl'].split('?').shift();
  return urlWithoutQuery;
});

export function requestLoggerBuilder() {
  return morgan(':date :url :method :status :remote-addr :response-time ms', { stream });
}
