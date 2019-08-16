'use strict';

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = { // TODO - add field types and validation rules
      category_id: {},
      price: {},
      weight: {},
      quantity_in_stock: {},
    };
  }
}

module.exports = Products;
