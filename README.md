# karma-ng-json2js-preprocessor [![Build Status](https://travis-ci.org/EE/karma-ng-json2js-preprocessor.svg?branch=master)](https://travis-ci.org/EE/karma-ng-json2js-preprocessor)

> Preprocessor for converting JSON files to [AngularJS](http://angularjs.org/) constants.

**NOTE: `karma-ng-json2js-preprocessor` is no longer maintained because AngularJS reached its End-of-Life.**

## Installation

The easiest way is to keep `karma-ng-json2js-preprocessor` as a devDependency in your `package.json`. You can simple do it by:

```bash
npm install karma-ng-json2js-preprocessor --save-dev
```

## Configuration

```js
// karma.conf.js
module.exports = function (config) {
    config.set({
        preprocessors: {
            '**/*.json': ['ng-json2js'],
        },

        plugins: ['karma-ng-json2js-preprocessor'],

        files: [
            'app/**/*.js', // application files
            'test/fixture/*.json', // JSON fixtures
            'test/spec/*.js', // test files
        ],

        ngJson2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'test/fixture/',
            // prepend this to the file path
            prependPrefix: 'served/',

            /* or define a custom transform function
      cacheIdFromPath: function(filepath) {
        return cacheId;
      }
      */
        },
    });
};
```

## How does it work ?

This preprocessor converts JSON files into Angular constants and puts them in separate Angular modules; each named the same as the source JSON file and generates Angular modules.

For instance this `test/fixture/data.json` ...

```json
{
    "prop": "val"
}
```

... with the configuration given above will be converted into:

```js
angular.module('served/data.json', []).constant('servedData', {
    prop: 'val',
});
```

Inject json fixture into your test case:

```js
describe('me', function () {
    beforeEach(module('served/data.json'));

    it('should not fail', function () {
        var testFixture;
        inject(function (_servedData_) {
            testFixture = _servedData_;
        });

        expect(testFixture).toEqual({
            prop: 'val',
        });
    });
});
```

## Browser support

This package is tested against the following browsers:

-   Firefox, Chrome, Edge & Safari: latest version
-   IE 11
-   Chrome for Android: latest version
-   iOS: latest two versions

Other browsers and versions might work but there's no guarantee.

Automated tests are possible due to the courtesy of [BrowserStack](https://www.browserstack.com).

![BrowserStack icon](https://rawgithub.com/EE/karma-ng-json2js-preprocessor/master/browserstack-logo.svg)

---

## Supported Node.js versions

This project aims to support all Node.js versions supported upstream (see [Release README](https://github.com/nodejs/Release/blob/master/README.md) for more details).

## Contributing

Before sending a pull request, run `npm test` in terminal to make sure all tests pass. To continuously run tests during development, run `karma start`.

For more information on Karma see the [homepage].

[homepage]: http://karma-runner.github.com
