'use strict';

let common = require('digs-common');
let define = common.define;
let Promise = common.Promise;
let db = require('./db');
let DigsLogger = common.defines.DigsLogger;
let types = require('./types');

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
        this.warn(`Attempt to reconnect to already-connected DB at ` +
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
          return this;
        });
    },
    model(name, def) {
      return define.convertConstructor(this.db.createModel(name, def));
    },
    types() {
      return types;
    },
    get() {
      return this.db.get.apply(this.db, arguments);
    }
  }
})
  .compose(DigsLogger);

module.exports = DigsData;
