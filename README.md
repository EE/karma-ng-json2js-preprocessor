# karma-ng-json2js-preprocessor

> Preprocessor for converting JSON files to [AngularJS](http://angularjs.org/) values.

## Installation

The easiest way is to keep `karma-ng-json2js-preprocessor` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "karma": "~0.9",
    "karma-ng-json2js-preprocessor": "~0.0.1"
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
      '**/*.html': ['ng-html2js']
    },

    files: [
      '*.js',
      '*.html'
    ],

    ngJson2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public/',
      // prepend this to the
      prependPrefix: 'served/',

      // or define a custom transform function
      cacheIdFromPath: function(filepath) {
        return cacheId;
      }
    }
  });
};
```

## How does it work ?

This preprocessor converts JSON files into Angular values and puts them in separate Angular modules; each named the same
as the source JSON file and generates Angular modules.

For instance this `data.json`...
```json
{
    prop: val
}
```
... will be converted into:
```js
angular.module('data.json', []).value('data.json', {
    prop: val
});
```

----

For more information on Karma see the [homepage].


[homepage]: http://karma-runner.github.com
