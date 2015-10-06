'use strict';

var assert = require('assert');
var runAsync = require('./index');

describe('runAsync', function () {
  it('run synchronous method', function (done) {
    var aFunc = function () {
      return 'pass1';
    };
    runAsync(aFunc, function (err, val) {
      assert.ifError(err);
      assert.equal(val, 'pass1');
      done();
    });
  });

  it('synchronous method throws', function (done) {
    var aFunc = function () {
      throw new Error('err1');
    };
    runAsync(aFunc, function (err, val) {
      assert(err);
      assert.strictEqual(err.message, 'err1');
      done();
    });
  });

  it('run asynchronous method', function (done) {
    var aFunc = function () {
      var returns = this.async();
      setTimeout(returns.bind(null, null, 'pass2'), 0);
    };

    runAsync(aFunc, function (err, val) {
      assert.ifError(err);
      assert.equal(val, 'pass2');
      done();
    });
  });

  it('asynchronous method returns error', function (done) {
    var aFunc = function () {
      var returns = this.async();
      setTimeout(returns.bind(null, new Error('err2')), 0);
    };

    runAsync(aFunc, function (err, val) {
      assert(err);
      assert.equal(err.message, 'err2');
      done();
    });
  });

  it('pass arguments', function (done) {
    var aFunc = function (a, b) {
      assert.equal(a, 1);
      assert.equal(b, 'bar');
      return 'pass1';
    };
    runAsync(aFunc, function (err, val) {
      assert.ifError(err);
      done();
    }, 1, 'bar');
  });

  it('allow only callback once', function (done) {
    var aFunc = function () {
      var returns = this.async();
      returns();
      returns();
    };

    runAsync(aFunc, function (err, val) {
      assert.ifError(err);
      done();
    });
  });

  it('dezalgo ensures callback is called async', function(done) {
    var ranAsync = false;
    var syncFn = function() {
      return 'dezalgo';
    };
    var cb = function(err, result) {
      assert.ifError(err);
      assert.strictEqual(result, 'dezalgo');
      assert.strictEqual(ranAsync, true);
      done();
    };
    runAsync.dezalgo(syncFn, cb);
    // should be set to true before the assertion runs
    ranAsync = true;
  });

  it('dezalgo ensures callback is called async with error', function(done) {
    var ranAsync = false;
    var syncFn = function() {
      throw new Error('dezalgo');
    };
    var cb = function(err) {
      assert(err);
      assert.strictEqual(err.message, 'dezalgo');
      assert.strictEqual(ranAsync, true);
      done();
    };
    runAsync.dezalgo(syncFn, cb);
    // should be set to true before the assertion runs
    ranAsync = true;
  });
});
