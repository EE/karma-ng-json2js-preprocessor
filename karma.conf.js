'use strict';

var _ = require('lodash');

module.exports = function (config) {
    var preprocessors = config.preprocessors;
    // put JSON data into a mock
    preprocessors['**/*.json'] = 'ng-json2js';

    var customLaunchers = {
        SL_Chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: '43',
        },
        SL_Firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: '39',
        },
        SL_Safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            version: '8',
        },
        SL_IE_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '11',
        },
        SL_IE_9: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            version: '9',
        },
    };


    var settings = {
        frameworks: ['jasmine'],

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // list of files / patterns to load in the browser
        files: [
            'test/vendor/angular.js',
            'test/vendor/angular-mocks.js',
            'test/fixtures/*.json',
            'test/ng-json2js.spec.js',
        ],

        // list of files to exclude
        exclude: [],

        preprocessors: preprocessors,

        plugins: config.plugins.concat([
            require('./lib/index.js'),
        ]),

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: process.env.TRAVIS ? ['dots', 'saucelabs'] : ['progress'],

        // web server port
        port: 8080,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        customLaunchers: customLaunchers,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: process.env.TRAVIS ? Object.keys(customLaunchers) : ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
    };

    if (process.env.TRAVIS) {
        _.assign(settings, {
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 5,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,

            sauceLabs: {
                testName: require('./package.json').name,
                startConnect: true,
                tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
            },
        });
    }

    config.set(settings);
};
