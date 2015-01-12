/* global define */

'use strict';

define(['angular', 'angularmocks'], function (angular) {
    describe('json2j preprocessor', function () {

        beforeEach(module('test/fixtures/empty.json'));
        beforeEach(module('test/fixtures/complex.json'));

        it('should work on an empty object', function () {
            var testFixturesEmpty;
            inject(function (_testFixturesEmpty_) {
                testFixturesEmpty = _testFixturesEmpty_;
            });

            expect(testFixturesEmpty).toEqual({});
        });

        var checkComplexObject = function (testFixturesComplex) {
            expect(testFixturesComplex).toEqual({
                field: 'property',
                subObject: [
                    'arrayElem1',
                    'arrayElem2',
                ],
                anotherSubObject: {
                    subSubObject: {
                        field: 'property',
                    },
                },
            });
        };

        it('should work on a complex object', function () {
            var testFixturesComplex;
            inject(function (_testFixturesComplex_) {
                testFixturesComplex = _testFixturesComplex_;
            });

            checkComplexObject(testFixturesComplex);
        });

        it('should allow accessing the json during configuration phase', function () {
            var injectedDuringConfig;
            angular.module('testModule', ['test/fixtures/complex.json']).config(function (_testFixturesComplex_) {
                injectedDuringConfig = _testFixturesComplex_;
            });

            inject(module('testModule'));

            checkComplexObject(injectedDuringConfig);
        });
    });

});
