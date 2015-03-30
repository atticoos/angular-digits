(function () {
  'use strict';

  angular.module('atticoos.digits', [])
  .run(['$window', 'Digits', function ($window, Digits) {
    $window.Digits.init({consumerKey: Digits.getConsumerKey()});
  }]);
}).apply(this);
