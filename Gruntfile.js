'use strict';

module.exports = function (grunt) {
    var fs = require('fs'),
        filteredTasks = [
            ['jshint', 'main'],
            ['jshint', 'test'],
            ['jsonlint', 'all'],
        ];


    function getFilterFunction() {
        // Returns a function that tells if a file was recently modified - it's used by jshint & defs tasks
        // so that they run only on changed files.
        return function (filepath) {
            var srcTime = fs.statSync(filepath).mtime.getTime();
            return srcTime > Date.now() - 5000; // don't watch files changed before last 5 seconds
        };
    }

    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        'ddescribe-iit': {
            files: ['test/json2js.spec.js'],
        },

        jshint: {
            main: {
                src: [
                    'Gruntfile.js',
                    'karma.conf.js',
                    'lib/**/*.js',
                ],
                options: {
                    jshintrc: '.jshintrc',
                }
            },
            test: {
                src: ['test/json2js.spec.js'],
                options: {
                    jshintrc: 'test/.jshintrc',
                }
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


    // Add copies of watched tasks with an added filter option.
    filteredTasks.forEach(function (taskAndTarget) {
        var newTaskAndTarget = taskAndTarget.slice(0);
        newTaskAndTarget[newTaskAndTarget.length - 1] = newTaskAndTarget[newTaskAndTarget.length - 1] + 'Filtered';

        grunt.config(newTaskAndTarget, grunt.config(taskAndTarget));
        grunt.config(newTaskAndTarget.concat(['filter']), getFilterFunction());
    });


    grunt.registerTask('commitChecks', [
        'ddescribe-iit',
        'merge-conflict',
    ]);

    grunt.registerTask('lint', [
        'jshint:main',
        'jshint:test',
        'jsonlint:all',
    ]);

    grunt.registerTask('test', [
        'lint',
        'commitChecks',
        'karma:unit',
    ]);

    grunt.registerTask('default', ['test']);
};
