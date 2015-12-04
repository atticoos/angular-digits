module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'https://cdn.digits.com/1/sdk.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/polyfill.js',
      'src/digits.js',
      'src/provider.js',
      'src/digits-response.js',
      'src/digits-response-error.js',
      'test/**/*.spec.js'
    ],
    reporters: ['dots']
  });
};
