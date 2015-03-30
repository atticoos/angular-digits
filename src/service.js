(function () {
  'use strict';

  function DigitsService ($rootScope, $window, $q) {
    var service = {};

    service.login = function () {
      var deferred = $q.defer();

      $window.Digits.logIn()
      .done(function (response) {
        $rootScope.$apply(function () {
          deferred.resolve(response);
        });
      })
      .fail(function (error) {
        $rootScope.$apply(function () {
          deferred.reject(error);
        });
      });

      return deferred.promise;
    };

    return service;
  }

  angular.module('atticoos.digits')
  .factory('DigitsService', ['$rootScope', '$window', '$q', DigitsService]);

}).apply(this);
