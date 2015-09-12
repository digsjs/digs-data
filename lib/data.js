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
      if (this.db) {
        this.info(`Attempt to reconnect to already-connected DB at ` +
          `${this.host}:${this.port}`);
        return Promise.resolve(this.db);
      }
      this.db = db.connect({
        host: this.host,
        port: this.port,
        db: this.namespace
      });
      this.info(`Connecting to DB at ${this.host}:${this.port}`);
      return this.db.dbReady()
        .bind(this)
        .then(function notify() {
          this.emit('connected', this.db);
          this.info(`Connected to DB at ${this.host}:${this.port}`);
          return this.db;
        });
    },
    model(name, def) {
      return define.convertConstructor(this.db.createModel(name, def));
    }
  }
})
  .compose(DigsLogger);

module.exports = DigsData;
