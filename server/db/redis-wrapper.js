(function () {
  "use strict";

  var redis = require('redis')
    ;

  function RedisWrapper(opts) {

    var client;
      ;

    function createClient(opts) {
      client = redis.createClient(opts.socket);
      client.on('connect', selectDb);
      client.on('error', handleError);
    }

    function selectDb() {
      client.select(opts.database || 0, function (err, res) {
        if (err) {
          handleError(err);
        }
      });
    }

    function handleError(err) {
      console.error("[dropshare redis]", err.message);
      client.quit();
    }

    createClient(opts);

    return {
      set: function (id, val, cb) {
        if (typeof(cb) === 'undefined') {
          cb = function (err, data) {};
        }

        if (typeof(val) !== "string") {
          val = JSON.stringify(val);
        }

        client.set(id, val, cb);
      },

      get: function (id, cb) {
        client.get(id, function (err, data) {
          var isJSON = true;
          if (data) {
            // If JSON was not stored, then what to do? we need to catch it somehow
            try {
              data = JSON.parse(data);
            }
            catch (e) {
              console.log('data was not json. hope that is okay');
              isJSON = false;
            }
          }
          cb(err, data, isJSON);
        });
      },

      del: function (id, cb) {
        client.del(id, cb);
      },

      quit: function () {
        client.quit();
      }
    };
  }

  function create(opts) {
    return new RedisWrapper(opts);
  };

  module.exports.create = create;
}());
