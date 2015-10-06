Run Async Nodeback
=========

[![npm](https://badge.fury.io/js/run-async-nodeback.svg)](http://badge.fury.io/js/run-async-nodeback) [![tests](https://travis-ci.org/jamestalmage/run-async.svg?branch=nodeback)](http://travis-ci.org/jamestalmage/run-async) [![dependencies](https://david-dm.org/jamestalmage/run-async.svg?theme=shields.io)](https://david-dm.org/jamestalmage/run-async)

Fork of `run-async` that uses `nodeback` style callbacks (i.e. `callback(err, result)`);

Utility method to run function either synchronously or asynchronously using the common `this.async()` style.

This is useful for library author accepting sync or async functions as parameter. `runAsync` will always run them as async method, and normalize the function handling.

`runAsync.dezalgo` ensures your callback is always called asynchronously.

Standard `runAsync` method will run your callback synchronously if user callback is synchronous. (beware of Zalgo!)

Installation
=========

```bash
npm install --save run-async
```

Usage
=========

```js
var runAsync = require('run-async-nodeback');

// In Async mode:
var asyncFn = function (a) {
  var done = this.async();

  setTimeout(function () {
    done(null, 'running: ' + a);
  }, 10);
};

runAsync(asyncFn, function (err, answer) {
  if (err) throw err;
  console.log(answer); // 'running: async'
}, 'async');

// In Sync mode:
var syncFn = function (a) {
  return 'running: ' + a;
};

runAsync(syncFn, function (err, answer) {
  if (err) throw err;
  console.log(answer); // 'running: sync'
}, 'sync');


runAzync.dezalgo(syncFun, function (err, answer) {
  if (err) throw err;
  console.log(answer); // 'running: dezalgo'
}, 'dezalgo');
```

Licence
========

Copyright (c) 2014 Simon Boudrias (twitter: @vaxilart)  
Licensed under the MIT license.
