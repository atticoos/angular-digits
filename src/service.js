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
