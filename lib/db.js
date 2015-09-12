'use strict';

const thinky = require('thinky');

function db(opts) {
  if (db.connection) {
    return db.connection;
  }
  return db.connection = thinky(opts);
}
db.connection = null;

module.exports = db;
