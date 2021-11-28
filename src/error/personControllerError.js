import { AppError } from './appError.js';

class PersonControllerError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export { PersonControllerError };
