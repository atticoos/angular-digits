(function () {
  'use strict';

  angular.module('atticoos.digits', [])
  .run(['$window', 'Digits', function ($window, Digits) {
    $window.Digits.init({consumerKey: Digits.consumerKey});
  }]);
}).apply(this);

(function () {
  'use strict';

  function DigitsProvider () {
    var getter;
    this.consumerKey = null;

    getter = function () {
      return {
        consumerKey: this.consumerKey
      };
    }.bind(this);

    return {
      setConsumerKey: function (consumerKey) {
        this.consumerKey = consumerKey;
      }.bind(this),
      $get: getter
    };
  }

  angular.module('atticoos.digits')
  .provider('Digits', [DigitsProvider]);
}).apply(this);

(function () {
  'use strict';

  function DigitsService ($rootScope, $window, $q, DigitsResponseError) {
    var service = {},
        conditionalApply;

    conditionalApply = function (execution) {
      if ($rootScope.$$phase) {
        execution();
      } else {
        $rootScope.$apply(execution);
      }
    }

    service.login = function () {
      var deferred = $q.defer();

      $window.Digits.logIn()
      .done(function (response) {
        conditionalApply(function () {
          deferred.resolve(response);
        });
      })
      .fail(function (error) {
        conditionalApply(function () {
          deferred.reject(new DigitsResponseError(error));
        });
      });

      return deferred.promise;
    };

    service.isLoggedIn = function () {
      var deferred = $q.defer();
      $window.Digits.getLoginStatus()
      .done(function (response) {
        conditionalApply(function () {
          if (response.status === 'authorized') {
            deferred.resolve();
          } else {
            deferred.reject();
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

    service.getLoginStatus = function () {
      var deferred = $q.defer();
      $window.Digits.getLoginStatus()
      .done(function (response) {
        $rootScope.$apply(function () {
          deferred.resolve(response);
        });
      }).fail(function (error) {
        $rootScope.$apply(function () {
          deferred.reject(error);
        });
      });
      return deferred.promise;
    };

    return service;
  }

  angular.module('atticoos.digits')
  .factory('DigitsService', ['$rootScope', '$window', '$q', 'DigitsResponseError', DigitsService]);

}).apply(this);

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
