'use strict';

module.exports = (function () {
    const util = require('util');
    const TEMPLATE = 'angular.module(\'%s\', []).constant(\'%s\', %s);\n';

    const createPreprocessor = function createNgJson2jsPreprocessor(logger, basePath, config) {
        config = config || {};

        const log = logger.create('preprocessor.ng-json2js');
        const stripPrefix = new RegExp(`^${ config.stripPrefix || '' }`);
        const prependPrefix = config.prependPrefix || '';
        const componentIdFromPath = config.cacheIdFromPath ||
            function (filepath) {
                return prependPrefix + filepath.replace(stripPrefix, '');
            };

        return function (content, file, done) {
            log.debug('Processing "%s".', file.originalPath);

            const jsonPath = componentIdFromPath(file.originalPath.replace(`${ basePath }/`, ''));
            const componentName = jsonPath
                .replace(/\.json$/, '')
                .replace(/(?:-|\/)([a-zA-Z0-9])/g, (__all, letter) => letter.toUpperCase());
            file.path += '.js';

            done(util.format(TEMPLATE, jsonPath, componentName, content));
        };
    };

    createPreprocessor.$inject = ['logger', 'config.basePath', 'config.ngJson2JsPreprocessor'];

    return createPreprocessor;
})();
