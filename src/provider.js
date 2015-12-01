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
