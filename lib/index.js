'use strict';

let DigsData = require('./data');

function digsData(digs, opts, done) {
  digs.expose('data', DigsData(opts, digs));

  done();
}

digsData.attributes = {
  pkg: require('../package.json'),
  dependencies: 'digs'
};
