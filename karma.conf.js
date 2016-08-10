'use strict';

var _ = require('lodash');

module.exports = function (config) {
    var preprocessors = config.preprocessors;
    // put JSON data into a mock
    preprocessors['**/*.json'] = 'ng-json2js';

    var customLaunchers = {
        BS_Chrome: {
            base: 'BrowserStack',
            browser: 'chrome',
            browser_version: '52.0',
            os: 'Windows',
            os_version: '10',
        },
        BS_Firefox: {
            base: 'BrowserStack',
            browser: 'firefox',
            browser_version: '48.0',
            os: 'Windows',
            os_version: '10',
        },
        BS_Safari: {
            base: 'BrowserStack',
            browser: 'safari',
            browser_version: '9.0',
            os: 'OS X',
            os_version: 'El Capitan',
        },
        BS_IE_9: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '9.0',
            os: 'Windows',
            os_version: '7',
        },
        BS_IE_10: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '10.0',
            os: 'Windows',
            os_version: '7',
        },
        BS_IE_11: {
            base: 'BrowserStack',
            browser: 'ie',
            browser_version: '11.0',
            os: 'Windows',
            os_version: '10',
        },
        BS_Edge: {
            base: 'BrowserStack',
            browser: 'edge',
            browser_version: '14.0',
            os: 'Windows',
            os_version: '10',
        },
        BS_iOS_7: {
            base: 'BrowserStack',
            device: 'iPhone 5S',
            os: 'ios',
            os_version: '7.0',
            real_mobile: 'false',
        },
        BS_iOS_8: {
            base: 'BrowserStack',
            device: 'iPhone 6',
            os: 'ios',
            os_version: '8.3',
            real_mobile: 'false',
        },
        BS_iOS_9: {
            base: 'BrowserStack',
            device: 'iPhone 6S',
            os: 'ios',
            os_version: '9.0',
            real_mobile: 'false',
        },
        BS_Android_4_1: {
            base: 'BrowserStack',
            browser: 'Android Browser',
            os: 'android',
            os_version: '4.1',
            real_mobile: 'false',
        },
        BS_Android_4_2: {
            base: 'BrowserStack',
            browser: 'Android Browser',
            os: 'android',
            os_version: '4.2',
            real_mobile: 'false',
        },
        BS_Android_4_3: {
            base: 'BrowserStack',
            browser: 'Android Browser',
            os: 'android',
            os_version: '4.3',
            real_mobile: 'false',
        },
        BS_Android_Chrome: {
            base: 'BrowserStack',
            browser: 'Android Browser',
            os: 'android',
            os_version: '4.4',
            real_mobile: 'false',
        },
        BS_Windows_Phone: {
            base: 'BrowserStack',
            browser: 'IE Mobile',
            device: 'Nokia Lumia 630',
            os: 'winphone',
            os_version: '8.1',
            real_mobile: 'false',
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
        reporters: process.env.TRAVIS ? 'dots' : 'progress',

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
        // - FirefoxDeveloperEdition
        // - FirefoxNightly
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        //
        // Travis has headless Firefox so use Firefox here - it will work locally
        // as well as for pull requests from other remotes.
        browsers: process.env.TRAVIS && process.env.BROWSER_STACK_USERNAME &&
            process.env.BROWSER_STACK_ACCESS_KEY ?
                Object.keys(customLaunchers) :
                ['Firefox'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
    };

    if (process.env.TRAVIS) {
        _.assign(settings, {
            browserDisconnectTimeout: 1e4,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 2e4,
            captureTimeout: 3e5,

            browserStack: {
                project: require('./package.json').name,
                build: [
                    'travis #',
                    process.env.TRAVIS_JOB_NUMBER,
                    (process.env.TRAVIS_PULL_REQUEST === 'false' ?
                        '' :
                        ', PR: #' + process.env.TRAVIS_PULL_REQUEST),
                ].join(''),
                timeout: 600,
                // BrowserStack has a limit of 120 requests per minute. The default
                // "request per second" strategy doesn't scale to so many browsers.
                pollingTimeout: 10000,
            },
        });
    }

    config.set(settings);
};
