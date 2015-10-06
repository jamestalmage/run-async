'use strict';

var assert = require('assert');
var runAsync = require('./index');

describe('runAsync', function () {
  it('run synchronous method', function (done) {
    var aFunc = function () {
      return 'pass1';
    };
    runAsync(aFunc, function (val) {
      assert.equal(val, 'pass1');
      done();
    });
  });

  it('run asynchronous method', function (done) {
    var aFunc = function () {
      var returns = this.async();
      setTimeout(returns.bind(null, 'pass2'), 0);
    };

    runAsync(aFunc, function (val) {
      assert.equal(val, 'pass2');
      done();
    });
  });

  it('pass arguments', function (done) {
    var aFunc = function (a, b) {
      assert.equal(a, 1);
      assert.equal(b, 'bar');
      return 'pass1';
    };
    runAsync(aFunc, function (val) {
      done();
    }, 1, 'bar');
  });

  it('allow only callback once', function (done) {
    var aFunc = function () {
      var returns = this.async();
      returns();
      returns();
    };

    runAsync(aFunc, function (val) {
      done();
    });
  });

  it('dezalgo ensures callback is called async', function(done) {
    var ranAsync = false;
    var syncFn = function() {
      return 'dezalgo';
    };
    var cb = function(result) {
      assert.strictEqual(result, 'dezalgo');
      assert.strictEqual(ranAsync, true);
      done();
    };
    runAsync.dezalgo(syncFn, cb);
    // should be set to true before the assertion runs
    ranAsync = true;
  });
});
