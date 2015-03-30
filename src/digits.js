(function () {
  'use strict';

  angular.module('atticoos.digits', [])
  .config([
    '$windowProvider',
    'DigitsProvider',
    function ($windowProvider, DigitsProvider) {
      $windowProvider.$get().Digits.init({consumerKey: DigitsProvider.consumerKey});
    }
  ])
  .run(['DigitsService', function (DigitsService) {
    DigitsService.login();
  }]);
}).apply(this);
