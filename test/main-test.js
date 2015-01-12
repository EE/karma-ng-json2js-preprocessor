/* global window */

var file, testFiles = [];

for (file in window.__karma__.files) {
    if (/spec.*\.js$/.test(file)) {
        testFiles.push(file);
    }
    if (/.*\.json\.js$/.test(file)) {
        testFiles.push(file);
    }
}

require({
    baseUrl: 'http://localhost:9876/base/',
    paths:{
        angular: 'test/vendor/angular',
        angularmocks: 'test/vendor/angular-mocks',
    },
    shim: {
        angular: {
            exports: 'angular',
        },
        angularmocks: {
            deps: ['angular'],
        },
    },
    deps: testFiles,

    callback: window.__karma__.start,
});
