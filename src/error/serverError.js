import { AppError } from './appError.js';

class ServerError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export { ServerError };
