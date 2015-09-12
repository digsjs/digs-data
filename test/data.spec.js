'use strict';

let digsLoggerSuite = require('digs-common/test/defines/suites/logger');
let _ = require('digs-common').utils;
let Promise = require('digs-common').Promise;

function digsDataSuite(DigsData) {
  let sandbox;
  let digs = {
    namespace: 'digs',
    project: 'home',
    settings: {
      app: {
        namespace: 'digs',
        project: 'home'
      }
    }
  };

  beforeEach(function() {
    sandbox = sinon.sandbox.create('DigsData');
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
      db.connection = {
        dbReady: sandbox.stub().returns(Promise.resolve()),
        createModel: sandbox.stub().returns(function() {})
      };
      data = DigsData({}, digs);
    });

    describe('connect()', function() {
      it('should be a function', function() {
        expect(data.connect).to.be.a('function');
      });

      it('should have a non-null db property', function() {
        return expect(data.connect()).to.eventually.equal(db.connection);
      });
    });

    describe('model()', function() {
      beforeEach(function() {
        data.connect().createModel = sandbox.stub();
      });

      it('should call db.createModel()', function() {
        data.model();
        expect(db.connection.createModel).to.have.been.calledOnce;
      });
    });
  });
}

describe('DigsData',
  _.partial(_.flow(digsLoggerSuite, digsDataSuite), require('../lib/data')));
