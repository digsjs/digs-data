'use strict';

const thinky = require('thinky');

module.exports = {
  db: null,
  connect(opts) {
    if (module.exports.db) {
      return module.exports.db;
    }
    return module.exports.db = thinky(opts);
  }
};
