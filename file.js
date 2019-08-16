'use strict';

const uuid = require('uuid/v4');

const fileEdit = require('./file-edit');

class Model {
  constructor(modelName) {
    this.dbFileName = `data/${modelName}.db`;
  }

  init() {
    return fileEdit.writeFile(this.dbFileName, {records:[]})
      .then()
      .catch(error => console.error(error));
  }

  get(id) {
    return fileEdit.readFile(this.dbFileName)
      .then(obj => {
        return obj.records.filter(record => record.id === id);
      })
      .catch(error => console.error(error));
  }

  create(entry) {
    entry.id = uuid();
    const record = this.sanitize(entry);

    return fileEdit.readFile(this.dbFileName)
      .then(obj => {
        obj['records'].push(record);
        return fileEdit.writeFile(this.dbFileName, obj);
      })
      .then(() => record)
      .catch(error => console.error(error));
  }

  update(id, entry) {

  }

  delete(id) {

  }

  sanitize(entry) {
    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      // Check that required properties are present
      if (this.schema[field].required && !entry[field]) {
        valid = false;
      }

      // Check that properties have valid types
      if (entry[field] && typeof entry[field] !== this.schema[field].type) {
        valid = false;
      }

      if (valid) {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }
}

module.exports = Model;
