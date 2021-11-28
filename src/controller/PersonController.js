import { validate as uuidValidate, v4 as uuid } from 'uuid';
import { PersonModel } from '../model/index.js';
import { PersonControllerError } from '../error/index.js';
import {
  MESSAGES,
  formatString,
  errorResponseHandler,
  successResponseHandler,
  getDataFromRequest,
} from '../common/index.js';

class PersonController {
  constructor() {
    this.personModel = new PersonModel();
  }

  #extractIdFromRequest(req) {
    const url = decodeURIComponent(req.url);

    const indexSecondSlash = url.indexOf('/', 1);
    if (indexSecondSlash !== -1) {
      return url.slice(indexSecondSlash + 1);
    }
  }

  #checkRequiredFields(personData) {
    this.personModel.personModelRequiredFields.forEach((value) => {
      if (!(value in personData)) {
        throw new PersonControllerError(formatString(MESSAGES.FIELD_REQUIRED, [value]), 400);
      }
    });
  }

  #preparePersonWithRequiredFields(personData) {
    return this.personModel.personModelRequiredFields.reduce((acc, currValue) => {
      acc[currValue] = personData[currValue];
      return acc;
    }, {});
  }

  async get(req, res) {
    try {
      let personInfo;
      const id = this.#extractIdFromRequest(req);
      if (id) {
        if (!uuidValidate(id)) {
          throw new PersonControllerError(formatString(MESSAGES.ID_IS_NOT_VALID, [id]), 400);
        }

        personInfo = this.personModel.getById(id);
      } else {
        personInfo = this.personModel.getAll();
      }

      successResponseHandler(res, 200, personInfo);
    } catch (err) {
      errorResponseHandler(res, err);
    }
  }

  async post(req, res) {
    try {
      const data = await getDataFromRequest(req);

      const personData = JSON.parse(data);
      this.#checkRequiredFields(personData);
      const person = this.#preparePersonWithRequiredFields(personData);
      person.id = uuid();

      this.personModel.create(person);

      successResponseHandler(res, 201, person);
    } catch (err) {
      errorResponseHandler(res, err);
    }
  }

  async put(req, res) {
    try {
      const id = this.#extractIdFromRequest(req);
      if (!id) {
        throw new PersonControllerError(MESSAGES.ID_NOT_SPECIFIED, 400);
      }

      if (!uuidValidate(id)) {
        throw new PersonControllerError(formatString(MESSAGES.ID_IS_NOT_VALID, [id]), 400);
      }

      const data = await getDataFromRequest(req);

      const personData = JSON.parse(data);
      this.#checkRequiredFields(personData);
      const person = this.#preparePersonWithRequiredFields(personData);
      person.id = id;

      this.personModel.update(person);

      successResponseHandler(res, 200, person);
    } catch (err) {
      errorResponseHandler(res, err);
    }
  }

  async delete(req, res) {
    try {
      const id = this.#extractIdFromRequest(req);
      if (!id) {
        throw new PersonControllerError(MESSAGES.ID_NOT_SPECIFIED, 400);
      }

      if (!uuidValidate(id)) {
        throw new PersonControllerError(formatString(MESSAGES.ID_IS_NOT_VALID, [id]), 400);
      }

      this.personModel.delete(id);

      successResponseHandler(res, 204);
    } catch (err) {
      errorResponseHandler(res, err);
    }
  }
}

export { PersonController };
