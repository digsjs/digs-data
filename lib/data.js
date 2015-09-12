'use strict';

let common = require('digs-common');
let define = common.define;
let Promise = common.Promise;
let db = require('./db');

let DigsLogger = common.defines.DigsLogger;

const DEFAULTS = {
  host: 'localhost',
  port: 28015,
  db: null
};

const DigsData = define({
  refs: DEFAULTS,
  methods: {
    connect() {
      const opts = {
        host: this.host,
        port: this.port,
        db: this.namespace
      };
      if (this.db) {
        return Promise.resolve(this.db);
      }
      this.db = db(opts);
      return this.db.dbReady()
        .return(this.db);
    },
    model(name, def) {
      return define.convertConstructor(this.db.createModel(name, def));
    }
  }
})
  .compose(DigsLogger);

module.exports = DigsData;
