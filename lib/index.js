'use strict';

const DigsData = require('./data');
const pkg = require('../package.json');
const types = require('./types');

function digsData(digs, opts, done) {
  return DigsData(opts, digs).connect()
    .then((data) => {
      digs.decorate('server', 'model', data.model.bind(data));
      digs.decorate('server', 'types', data.types.bind(data));
      digs.info(`${pkg.name} ready`);
    })
    .nodeify(done);
}

digsData.types = types;
digsData.DigsData = DigsData;
digsData.attributes = {
  pkg: pkg
};

module.exports = digsData;
