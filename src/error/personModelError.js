import { AppError } from './appError.js';

class PersonModelError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export { PersonModelError };
