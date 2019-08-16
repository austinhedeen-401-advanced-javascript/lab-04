const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  })

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('sanitize() returns undefined with arguments of the wrong type', () => {
    // TODO - test that sanitize() type checks
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          }); // TODO - refactor this out to promise chain
      });
  });

  it('can update() a category', () => {
    let obj = { name: 'Test Category' };
    let updated = { name: 'Test Updated' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record.id);
      })
      .then(category => {
        updated.id = category[0].id;
        return categories.update(category[0].id, updated);
      })
      .then(record => {
        return categories.get(record.id);
      })
      .then(category => {
        Object.keys(updated).forEach(key => {
          expect(category[0][key]).toEqual(updated[key]);
        });
      });
  });

  it('can delete() a category', () => {
    // TODO - test delete()
  });
});
