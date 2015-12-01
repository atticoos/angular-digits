(function () {
  'use strict';

  function DigitsResponse () {
    var HEADER = {
      AUTHORIZATION: 'X-Verify-Credentials-Authorization',
      URL: 'X-Auth-Service-Provider'
    };

    function Response (responseObject) {
      angular.forEach(responseObject, function (value, property) {
        Object.defineProperty(this, property, {
          enumerable: true,
          configurable: false,
          get: function () {
            return value;
          }
        });
      }.bind(this));
    }

    Response.prototype.getOAuthHeaders = function () {
      return {
        authorization: this.oauth_echo_headers[HEADER.AUTHORIZATION],
        url: this.oauth_echo_headers[HEADER.URL]
      };
    };

    return Response;
  }

  angular.module('atticoos.digits')
  .factory('DigitsResponse', [DigitsResponse]);
}).apply(this);
