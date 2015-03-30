(function () {
  'use strict';

  function DigitsProvider () {
    this.consumerKey = null;

    return {
      setConsumerKey: function (consumerKey) {
        this.consumerKey = consumerKey;
      }.bind(this),
      $get: getter
    };
  }

  angular.module('atticoos.digits').provider('DigitsProvider', [DigitsProvider]);
}).apply(this);
