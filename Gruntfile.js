'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        'ddescribe-iit': {
            files: ['test/ng-json2js.spec.js'],
        },

        eslint: {
            all: {
                src: [
                    '*.js',
                    'lib',
                    'test',
                ],
            },
        },

        jsonlint: {
            all: {
                src: [
                    '.jshintrc',
                    '{lib,test}/**/*.json',
                ],
            },
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
            },
        },

        'merge-conflict': {
            files: [
                '*',
                '{lib,test}/**/*',
            ],
        },
    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('commitChecks', [
        'ddescribe-iit',
        'merge-conflict',
    ]);

    grunt.registerTask('lint', [
        'eslint',
        'jsonlint',
    ]);

    grunt.registerTask('test', [
        'lint',
        'commitChecks',
        'karma:unit',
    ]);

    grunt.registerTask('default', ['test']);
};
