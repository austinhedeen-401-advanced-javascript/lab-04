'use strict';

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: {
        required: true,
        type: 'string',
      },
      category_id: {
        required: false,
        type: 'string',
      },
      price: {
        required: true,
        type: 'string',
      },
      weight: {
        required: true,
        type: 'string',
      },
      quantity_in_stock: {
        required: true,
        type: 'number',
      },
    };
  }
}

module.exports = Products;
