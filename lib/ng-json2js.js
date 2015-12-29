'use strict';

module.exports = (function () {
    var util = require('util');
    var TEMPLATE = 'angular.module(\'%s\', []).constant(\'%s\', %s);\n';

    var createPreprocessor = function createNgJson2jsPreprocessor(logger, basePath, config) {
        config = config || {};

        var log = logger.create('preprocessor.ng-json2js');
        var stripPrefix = new RegExp('^' + (config.stripPrefix || ''));
        var prependPrefix = config.prependPrefix || '';
        var componentIdFromPath = config.cacheIdFromPath ||
            function (filepath) {
                return prependPrefix + filepath.replace(stripPrefix, '');
            };

        return function (content, file, done) {
            log.debug('Processing "%s".', file.originalPath);

            var jsonPath = componentIdFromPath(file.originalPath.replace(basePath + '/', ''));
            var componentName = jsonPath
                .replace(/\.json$/, '')
                .replace(/(?:-|\/)([a-zA-Z0-9])/g, function (__all, letter) {
                    return letter.toUpperCase();
                });
            file.path += '.js';

            done(util.format(TEMPLATE, jsonPath, componentName, content));
        };
    };

    createPreprocessor.$inject = ['logger', 'config.basePath', 'config.ngJson2JsPreprocessor'];

    return createPreprocessor;
})();
