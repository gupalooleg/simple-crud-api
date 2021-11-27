import { AppError } from './appError.js';

class PersonModelError extends AppError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { PersonModelError };
