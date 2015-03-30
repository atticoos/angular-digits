(function () {
  'use strict';

  function DigitsResponseError () {
    var TYPE = {
      ABORT: 'abort',
      BLOCKED: 'popup_blocker'
    };

    function Response (responseObject) {
      this.type = responseObject.type;
      this.message = responseObject.message;
    }

    Response.prototype.wasWindowClosed = function () {
      return this.type === TYPE.ABORT;
    };

    Response.prototype.wasPopupBlocked = function () {
      return this.type === TYPE.BLOCKED;
    };

    return Response;

  }

  angular.module('atticoos.digits')
  .factory('DigitsResponseError', [DigitsResponseError]);

}).apply(this);
