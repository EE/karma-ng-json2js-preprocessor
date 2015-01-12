'use strict';

module.exports = function (config) {
    var preprocessors = config.preprocessors;
    // put JSON data into a mock
    preprocessors['**/*.json'] = 'ng-json2js';

    config.set({
        frameworks: ['jasmine', 'requirejs'],

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // list of files / patterns to load in the browser
        files: [
            'test/main-test.js',
            {pattern: 'test/vendor/angular.js', included: false},
            {pattern: 'test/vendor/angular-mocks.js', included: false},
            {pattern: 'test/fixtures/*.json', included: false},
            {pattern: 'test/ng-json2js.requirejs.spec.js', included: false},
            {pattern: 'karma.requirejs.conf.js', included: false, served: false},
        ],

        // list of files to exclude
        exclude: [],

        preprocessors: preprocessors,

        plugins: config.plugins.concat([
            require('./lib/index.js'),
            'karma-requirejs',
        ]),

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: ['progress'],

        // web server port
        port: 9876,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
    });
};
