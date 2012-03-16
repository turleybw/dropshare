(function () {
  "use strict";

  var config = require('./config')
    , app = require('./server')
    ;

  function run() {
    var server
      ;

    function logPort() {
      console.log("Dropsharing on " + server.address().address + ":" + server.address().port);
    }

    if (config.port) {
      server = app.listen(config.port, logPort);
    } else {
      server = app.listen(logPort);
    }
  }

  if (require.main === module) {
    run();
  }
}());
