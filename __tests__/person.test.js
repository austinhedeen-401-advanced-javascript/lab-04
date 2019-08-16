'use strict';

const Person = require('../person/person');

describe('Person Model', () => {

  const person = new Person('person');
  const testPerson = {
    first_name: 'Austin',
    last_name: 'Hedeen',
    age: 27,
  };

  beforeEach(() => {
    return person.init()
      .then()
      .catch(error => console.error(error));
  });

  test('can create() a new person', () => {
    return person.create(testPerson)
      .then(record => {
        Object.keys(testPerson).forEach(key => {
          expect(record[key]).toEqual(testPerson[key]);
        });
      })
      .catch(error => console.error(error));
  });

  test('can get() a person', () => {
    return person.create(testPerson)
      .then(record => {
        return person.get(record.id);
      })
      .then(record => {
        Object.keys(testPerson).forEach(key => {
          expect(record[0][key]).toEqual(testPerson[key]);
        });
      })
      .catch(error => console.error(error));
  });
});
