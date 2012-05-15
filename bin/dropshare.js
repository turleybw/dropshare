#!/usr/bin/env node
/*jshint node:true laxcomma:true*/
(function () {
  "use strict";

  var dropshare = require('./server')
    , port = process.argv[2] || 3700 // 37 === DS
    , server
    ;

  server = dropshare.create().listen(port);

  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
}());
