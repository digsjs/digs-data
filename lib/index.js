'use strict';

const DigsData = require('./data');
const pkg = require('../package.json');

function digsData(digs, opts, done) {
  return DigsData(opts, digs).connect()
    .then((data) => {
      digs.decorate('server', 'model', data.model.bind(data));
      digs.decorate('server', 'types', data.types.bind(data));
      digs.log(pkg.name, `${pkg.name} ready`);
    })
    .nodeify(done);
}

digsData.attributes = {
  pkg: pkg
};

module.exports = digsData;
