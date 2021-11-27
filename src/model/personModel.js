import { v4 as uuid } from 'uuid';
import { SimpleApiSchema } from '../db/index.js';
import { PersonModelError } from '../error/index.js';
import { MESSAGES, formatString } from '../common/index.js';

class PersonModel {
  constructor() {
    this.persons = SimpleApiSchema.Person;
  }

  getAll() {
    return this.persons;
  }

  getById(id) {
    const person = this.persons.find((value) => value.id === id);
    if (!person) {
      throw new PersonModelError(formatString(MESSAGES.PERSON_NOT_FOUND, [id]));
    }

    return person;
  }

  create(person) {
    const newPerson = person;
    newPerson.id = uuid();
    this.persons.push(newPerson);
  }

  update(person) {
    const index = this.persons.findIndex((value) => value.id === person.id);
    if (index === -1) {
      throw new PersonModelError(formatString(MESSAGES.PERSON_NOT_FOUND, [person.id]));
    }

    this.persons[index] = person;
  }

  delete(id) {
    const index = this.persons.findIndex((value) => value.id === id);
    if (index === -1) {
      throw new PersonModelError(formatString(MESSAGES.PERSON_NOT_FOUND, [id]));
    }

    this.persons.splice(index, 1);
  }
}

export { PersonModel };
