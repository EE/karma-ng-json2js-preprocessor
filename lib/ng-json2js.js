module.exports = (function () {
    'use strict';

    var util = require('util'),
        TEMPLATE =
            '\'use strict\';\n' +
            'function %sFunction (angular) {\n' +
            '  angular.module(\'%s\', []).constant(\'%s\', %s);\n' +
            '}\n' +
            'if (typeof define === \'function\' && define.amd) {\n' +
            '  define([\'angular\'], function (angular) {\n' +
            '    %sFunction(angular);\n' +
            '  });\n' +
            '} else {\n' +
            '  %sFunction(angular);\n' +
            '}\n';

    function createNgJson2jsPreprocessor(logger, basePath, config) {
        config = config || {};

        var log = logger.create('preprocessor.ng-json2js'),
            stripPrefix = new RegExp('^' + (config.stripPrefix || '')),
            prependPrefix = config.prependPrefix || '',
            componentIdFromPath = config.cacheIdFromPath ||
                function (filepath) {
                    return prependPrefix + filepath.replace(stripPrefix, '');
                };

        return function (content, file, done) {
            log.debug('Processing "%s".', file.originalPath);

            var jsonPath = componentIdFromPath(file.originalPath.replace(basePath + '/', '')),
                componentName = jsonPath
                    .replace(/\.json$/, '')
                    .replace(/(?:-|\/)([a-zA-Z0-9])/g, function (all, letter) {
                        return letter.toUpperCase();
                    });
            file.path = file.path + '.js';

            done(util.format(TEMPLATE, componentName, jsonPath, componentName, content, componentName, componentName));
        };
    }

    createNgJson2jsPreprocessor.$inject = ['logger', 'config.basePath', 'config.ngJson2JsPreprocessor'];

    return createNgJson2jsPreprocessor;
})();
