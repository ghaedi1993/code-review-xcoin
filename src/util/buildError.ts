import { isBoom } from '@hapi/boom';
import HttpStatus from 'http-status-codes';

function buildError(err: Error) {
  // HTTP errors
  if (isBoom(err)) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}

export default buildError;
