/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var request = require('ahr2')
    , pure = require('pure').$p
    , domready = require('domready')
    , $ = require('ender')
    , directive = {
          ".js-item": {
              "obj <-": {
                    ".js-title": "obj.name"
                  , "@href+": "obj._id"
                  , ".js-description": "obj.path"
              }
          }
      }
    , tpl
    ;

  domready(function () {
    tpl = $('.js-items').html();

    // /meta?name=/day|ryan/i
    request.get('/meta').when(function (err, ahr, data) {
      console.log('data', data.result, tpl);
      $('.js-items').html(tpl);
      pure('.js-items-container').render(data.result, directive);
    });
  });
}());
