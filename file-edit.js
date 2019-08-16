'use strict';

const fsExtra = require('fs-extra');

class FileEdit {
  static readFile(fileName) {
    return fsExtra.readFile(fileName)
      .then(fileContent => {
        try {
          return JSON.parse(fileContent.toString());
        } catch(error) {
          console.error('Invalid JSON object');
          throw error;
        }
      })
      .catch(error => console.error(error));
  }

  static writeFile(fileName, data) {
    const content = JSON.stringify(data);
    return fsExtra.writeFile(fileName, content)
      .then()
      .catch(error => console.error(error));
  }
}

module.exports = FileEdit;
