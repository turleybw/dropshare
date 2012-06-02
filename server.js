/*jshint node:true strict:true es5:true laxcomma:true*/
(function () {
  "use strict";

  var dropshare = require('./server/index')
    , config = require('./config')
    , options = {
          "tmp": "/tmp"
        , "storageDir": __dirname + "/files"
        , "client": __dirname + "/public"
        //, "databaseStrategy": "redis"
        , "databaseStrategy": "json"
      }
    , app
    , attributeName
    ;


  // Use the options provided in the config.js file
  for (attributeName in config) {
    options[attributeName] = config[attributeName];
  }

  app = dropshare.create(options);

  module.exports = app;
}());
