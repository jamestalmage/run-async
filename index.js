'use strict';

var once = require('once');

/**
 * Run a function asynchronously or synchronously
 * @param   {Function} func  Function to run
 * @param   {Function} cb    Callback function passed the `func` returned value
 * @...rest {Mixed}    rest  Arguments to pass to `func`
 * @return  {Null}
 */

module.exports = function (func, cb) {
  runAsync(func, cb, Array.prototype.slice.call(arguments, 2));
};

module.exports.dezalgo = function (func, cb) {
  runAsync(func, cb, Array.prototype.slice.call(arguments, 2), true);
};

function runAsync (func, cb, args, dezalgo) {
  cb = once(cb);
  var async = false;
  try {
    var answer = func.apply({
      async: function () {
        async = true;
        return cb;
      }
    }, args );
  } catch (e) {
    if (dezalgo) {
      process.nextTick(cb.bind(null, e));
    } else {
      cb(e);
    }
    return;
  }

  if (!async) {
    if (dezalgo) {
      process.nextTick(cb.bind(null, null, answer));
    } else {
      cb(null, answer);
    }
  }
}
