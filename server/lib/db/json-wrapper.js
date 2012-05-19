/*jshint node:true es5:true laxcomma:true laxbreak:true*/ 
(function () {
  "use strict";

  var Storage = require('dom-storage')
    , JsonStorage = require('json-storage')
    ;

  function JsonDb(opts) {
    var dbFile = opts.dbFile || __dirname + '/db.json'
      ;

    this._store = JsonStorage.create(Storage.create(dbFile));
  }
 
  JsonDb.prototype.get = function (key, cb) {
    var self = this
      ;

    process.nextTick(function () {
      cb(null, self._store.get(key), true);
    });
  };

  JsonDb.prototype.set = function (key, val, cb) {
    this._store.set(key, val);
    process.nextTick(function () {
      cb(null);
    });
  };

  JsonDb.prototype.del = function (key, cb) {
    this._store.remove(key);
    process.nextTick(function () {
      cb(null);
    });
  };

  JsonDb.prototype.quit = function (cb) {
    process.nextTick(function () {
      if (cb) {
        cb();
      }
    });
  };

  JsonDb.create = function (opts) {
    return new JsonDb(opts);
  };

  module.exports = JsonDb;
}());
