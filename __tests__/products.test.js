const Products = require('../products/products');

describe('Products Model', () => {

  const testProduct = {
    price: '6.99',
    weight: '24.5g',
    quantity_in_stock: 73,
  };
  let products;

  beforeEach(() => {
    products = new Products();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = products.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('sanitize() returns undefined with arguments of the wrong type', () => {
    const schema = products.schema;
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
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new product', () => {
    return products.create(testProduct)
      .then(record => {
        Object.keys(testProduct).forEach(key => {
          expect(record[key]).toEqual(testProduct[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    return products.create(testProduct)
      .then(record => {
        return products.get(record.id);
      })
      .then(product => {
        Object.keys(testProduct).forEach(key => {
          expect(product[0][key]).toEqual(testProduct[key]);
        });
      });
  });

  it('can update() a product', () => {
    let updated = {
      price: '4.99',
      weight: '24.5g',
      quantity_in_stock: 68,
    };
    return products.create(testProduct)
      .then(record => {
        return products.get(record.id);
      })
      .then(product => {
        updated.id = product[0].id;
        return products.update(product[0].id, updated);
      })
      .then(record => {
        return products.get(record.id);
      })
      .then(product => {
        Object.keys(updated).forEach(key => {
          expect(product[0][key]).toEqual(updated[key]);
        });
      });
  });

  it('can delete() a product', () => {
    return products.create(testProduct)
      .then(record => {
        return products.get(record.id);
      })
      .then(product => {
        return products.delete(product[0].id);
      })
      .then(() => {
        return products.get();
      })
      .then(product => {
        expect(product.length).toEqual(0);
      });
  });
});
