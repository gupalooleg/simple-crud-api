import { SimpleApiSchema } from '../db/index.js';
import { PersonModelError } from '../error/index.js';
import { MESSAGES, formatString } from '../common/index.js';

class PersonModel {
  constructor() {
    this.persons = SimpleApiSchema.Person;
    this.personModelRequiredFields = ['name', 'age', 'hobbies'];
  }

  getAll() {
    return this.persons;
  }

  getById(id) {
    const person = this.persons.find((value) => value.id === id);
    if (!person) {
      throw new PersonModelError(formatString(MESSAGES.PERSON_NOT_FOUND, [id]), 404);
    }

    return person;
  }

  create(person) {
    this.persons.push(person);
  }

  update(person) {
    const index = this.persons.findIndex((value) => value.id === person.id);
    if (index === -1) {
      throw new PersonModelError(formatString(MESSAGES.PERSON_NOT_FOUND, [person.id]), 404);
    }

    this.persons[index] = person;
  }

  delete(id) {
    const index = this.persons.findIndex((value) => value.id === id);
    if (index === -1) {
      throw new PersonModelError(formatString(MESSAGES.PERSON_NOT_FOUND, [id]), 404);
    }

    this.persons.splice(index, 1);
  }
}

export { PersonModel };
