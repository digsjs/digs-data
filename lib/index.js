'use strict';

let DigsData = require('./data');
let pkg = require('../package.json');
let types = require('./types');

function digsData(digs, opts, done) {
  return DigsData(opts, digs).connect()
    .then(function expose(data) {
      digs.decorate('server', 'model', data.model.bind(data));
      digs.decorate('server', 'types', data.types.bind(data));
      digs.info(`${pkg.name} ready`);
    })
    .nodeify(done);
}

digsData.types = types;

digsData.attributes = {
  pkg: pkg
};
