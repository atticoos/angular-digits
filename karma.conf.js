module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'https://cdn.digits.com/1/sdk.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'test/polyfill.js',
      'src/*.js',
      'test/**/*.spec.js'
    ],
    reporters: ['dots']
  });
};
