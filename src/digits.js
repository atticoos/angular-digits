(function () {
  'use strict';

  angular.module('atticoos.digits', ['atticoos.digits.provider', 'atticoos.digits.service'])
  .run([
    '$window',
    'DigitsProvider',
    function ($window, DigitsProvier) {
      $window.Digits.init({consumerKey: DigitsProvier.consumerKey});
    }
  ]);
}).apply(this);
