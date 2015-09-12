'use strict';

let digsLoggerSuite = require('digs-common/test/defines/suites/logger');
let _ = require('digs-common').utils;
let Promise = require('digs-common').Promise;

function digsDataSuite(DigsData) {
  let sandbox;
  let digs;

  beforeEach(function() {
    sandbox = sinon.sandbox.create('DigsData');
    digs = {
      namespace: 'digs',
      project: 'home',
      settings: {
        app: {
          namespace: 'digs',
          project: 'home'
        }
      }
    };
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('should be a function', function() {
    expect(DigsData).to.be.a('function');
  });

  describe('refs', function() {
    let data;

    beforeEach(function() {
      data = DigsData({}, digs);
    });

    it('should have a null db property', function() {
      expect(data.db).to.be.null;
    });

    it('should have a string host property', function() {
      expect(data.host).to.equal('localhost');
    });

    it('should have a numeric port property', function() {
      expect(data.port).to.equal(28015);
    });
  });

  describe('methods', function() {
    let db = require('../lib/db');
    let data;

    beforeEach(function() {
      db.db = {
        dbReady: sandbox.stub().returns(Promise.resolve()),
        createModel: sandbox.stub().returns(function() {
        })
      };
      sandbox.spy(db, 'connect');
      data = DigsData({}, digs);
      sandbox.stub(data, 'info');
    });

    describe('connect()', function() {
      it('should be a function', function() {
        expect(data.connect).to.be.a('function');
      });

      it('should have a non-null db property', function() {
        return expect(data.connect()).to.eventually.equal(db.db);
      });

      it('should call db.connect()', function() {
        return data.connect()
          .then(function() {
            expect(db.connect).to.have.been.calledOnce;
          });
      });

      it('should not call db.connect() again if connected', function() {
        return data.connect()
          .then(function() {
            return data.connect();
          })
          .then(function() {
            expect(db.connect).to.have.been.calledOnce;
          });
      });

      it('should emit a "connected" event', function(done) {
        data.on('connected', function(database) {
          expect(database).to.equal(db.db);
          done();
        });
        data.connect();
      });
    });

    describe('model()', function() {
      let connection;
      beforeEach(function() {
        return data.connect()
          .then(function(conn) {
            connection = conn;
          });
      });

      it('should call db.createModel()', function() {
        data.model();
        expect(connection.createModel).to.have.been.calledOnce;
      });
    });
  });
}

describe('DigsData',
  _.partial(_.flow(digsLoggerSuite, digsDataSuite), require('../lib/data')));
