(function () {
  'use strict';

  angular.module('atticoos.digits', [])
  .run(['$window', 'Digits', function ($window, Digits) {
    $window.Digits.init({consumerKey: Digits.getConsumerKey()});
  }]);
}).apply(this);

(function () {
  'use strict';
  /* https://dev.twitter.com/twitter-kit/web/digits */
  function DigitsProvider () {
    var consumerKey;

    /**
     * @name setConsumreKey
     * @public
     *
     * @description
     * Sets the Twitter public consumer key to be used with the Digits SDK
     */
    this.setConsumerKey = function (key) {
      consumerKey = key;
    };

    this.$get = [
      '$rootScope',
      '$log',
      '$q',
      '$window',
      'DigitsResponseError',
      'DigitsResponse',
      function ($rootScope, $log, $q, $window, DigitsLoginError, DigitsResponse) {
        var service = {},
            conditionalApply;

        conditionalApply = function (execution) {
          if ($rootScope.$$phase) {
            execution();
          } else {
            $rootScope.$apply(execution);
          }
        };

        service.getConsumerKey = function () {
          return consumerKey;
        };

        /**
         * @name login
         * @public
         *
         * @description
         * Prompts the login popup and resolve the response
         */
        service.login = function (options) {
          var deferred = $q.defer();

          options = angular.isDefined(options) ? options : {};

          $window.Digits.logIn(options)
          .done(function (response) {
            conditionalApply(function () {
              deferred.resolve(new DigitsResponse(response));
            });
          })
          .fail(function (error) {
            conditionalApply(function () {
              deferred.reject(new DigitsLoginError(error));
            });
          });
          return deferred.promise;
        };

        /**
         *  Checks if the user is already loggd in
         */
        service.isLoggedIn = function () {
          var deferred = $q.defer();
          $window.Digits.getLoginStatus()
          .done(function (response) {
            conditionalApply(function () {
              if (response.status === 'authorized') {
                deferred.resolve(response.status);
              } else {
                deferred.reject(response.status);
              }
            });
          })
          .fail(function () {
            conditionalApply(function () {
              deferred.reject();
            });
          });
          return deferred.promise;
        };

        return service;
      }
    ];
  }
  angular.module('atticoos.digits')
  .provider('Digits', [DigitsProvider]);
}).apply(this);

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
