describe('atticoos.digits', function () {
  var Digits;

  beforeEach(module('atticoos.digits', function (DigitsProvider) {
    DigitsProvider.setConsumerKey('xxx');
  }));

  beforeEach(inject(function (_Digits_) {
    Digits = _Digits_;
  }));

  it ('should exist', function () {
    expect(Digits).toBeDefined();
  })
});
