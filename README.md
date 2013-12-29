# karma-ng-json2js-preprocessor

> Preprocessor for converting JSON files to [AngularJS](http://angularjs.org/) values.

## Installation

The easiest way is to keep `karma-ng-json2js-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.9",
    "karma-ng-json2js-preprocessor": "~0.0.4"
  }
}
```

You can simple do it by:
```bash
npm install karma-ng-json2js-preprocessor --save-dev
```

## Configuration
```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    preprocessors: {
      '**/*.html': ['ng-html2js'],
      '**/*.json': ['json2js']
    },

    plugins: [
        'karma-ng-json2js-preprocessor'
    ],

    files: [
      'test/fixture/*.js',
      '*.html'
    ],

    ngJson2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'test/fixture/',
      // prepend this to the
      prependPrefix: 'served/',

      /* or define a custom transform function
      cacheIdFromPath: function(filepath) {
        return cacheId;
      }
      */
    }
  });
};
```

## How does it work ?

This preprocessor converts JSON files into Angular values and puts them in separate Angular modules; each named the same
as the source JSON file and generates Angular modules.

For instance this `test/fixture/data.json`  ...
```json
{
    prop: val
}
```
... with the configuration given above will be converted into:
```js
angular.module('served/data.json', []).value('servedData', {
    prop: 'val'
});
```
Inject json fixture into your test case:
```js
describe('me', function(){
    beforeEach(module('served/data.json'));

    it('should not fail', function() {
        var testFixture;
        inject(function (_servedData_) {
            testFixture = _servedData_;
        });

        expect(testFixture).toEqual({
            prop: 'val'
        });
    });

});
```

----

## Contributing

Before sending a pull request, run `grunt` in terminal to make sure all tests pass. To continuously run tests
during development, run `karma start`.


For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
