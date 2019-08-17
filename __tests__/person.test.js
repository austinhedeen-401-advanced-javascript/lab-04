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

  test('sanitize() returns undefined with missing requirements', () => {
    const schema = person.schema;
    var testRecord = {};
    for (let field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(person.sanitize(testRecord)).toBeUndefined();
  });

  test('sanitize() returns undefined with arguments of the wrong type', () => {
    const schema = person.schema;
    const testRecord = {};
    for (let field in schema) {
      if (schema[field].type === 'string') {
        testRecord[field] = 42;
      } else if (schema[field].type === 'number') {
        testRecord[field] = 'number';
      } else if (schema[field].type === 'boolean') {
        testRecord[field] = 'true';
      }
    }
    expect(person.sanitize(testRecord)).toBeUndefined();
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


  it('can update() a person', () => {
    let updated = {
      first_name: 'Samm',
      last_name: 'Dunlop',
      age: 24,
    };
    return person.create(testPerson)
      .then(record => {
        return person.get(record.id);
      })
      .then(record => {
        updated.id = record[0].id;
        return person.update(record[0].id, updated);
      })
      .then(record => {
        return person.get(record.id);
      })
      .then(record => {
        Object.keys(updated).forEach(key => {
          expect(record[0][key]).toEqual(updated[key]);
        });
      });
  });

  it('can delete() a person', () => {
    return person.create(testPerson)
      .then(record => {
        return person.get(record.id);
      })
      .then(record => {
        return person.delete(record[0].id);
      })
      .then(() => {
        return person.get();
      })
      .then(person => {
        expect(person.length).toEqual(0);
      });
  });
});
