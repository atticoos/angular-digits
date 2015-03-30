describe('atticoos.digits', function () {
  var DigitsService;

  beforeEach(module('atticoos.digits', function (DigitsProvider) {
    DigitsProvider.setConsumerKey('xxx');
  }));

  beforeEach(inject(function (_DigitsService_) {
    DigitsService = _DigitsService_;
  }));

  it ('should exist', function () {
    expect(DigitsService).toBeDefined();
  })
});
