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
