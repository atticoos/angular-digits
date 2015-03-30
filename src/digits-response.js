(function () {
  'use strict';

  function DigitsResponse () {
    var HEADER = {
      AUHORIZATION: 'X-Verify-Credentials-Authorization',
      URL: 'X-Auth-Service-Provider'
    };

    function Response (responseObject) {
      this.response = responseObject;
    }

    Response.prototype.getOAuthHeaders = function () {
      return {
        authorization: this.response.oauth_echo_headers[HEADER.AUTHORIZATION],
        url: this.response.oauth_echo_headers[HEADER.URL]
      }
    };

    return Response;
  }

  angular.module('atticoos.digits')
  .factory('DigitsResponse', [DigitsResponse]);
}).apply(this);
