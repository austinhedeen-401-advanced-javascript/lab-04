'use strict';

const DataModel = require('../file.js');

class Person extends DataModel {
  constructor() {
    super('person');
    this.schema = {
      id: {
        required: true,
        type: 'string',
      },
      first_name: {
        required: true,
        type: 'string',
      },
      last_name: {
        required: true,
        type: 'string',
      },
      age: {
        required: true,
        type: 'number',
      },
    };
  }
}

module.exports = Person;
