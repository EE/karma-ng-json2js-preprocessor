'use strict';

/* global angular */

describe('ng-json2js preprocessor', () => {
    beforeEach(module('test/fixtures/empty.json'));
    beforeEach(module('test/fixtures/complex.json'));

    it('should work on an empty object', () => {
        let testFixturesEmpty;
        inject((_testFixturesEmpty_) => {
            testFixturesEmpty = _testFixturesEmpty_;
        });

        expect(testFixturesEmpty).toEqual({});
    });

    const checkComplexObject = (testFixturesComplex) => {
        expect(testFixturesComplex).toEqual({
            field: 'property',
            subObject: ['arrayElem1', 'arrayElem2'],
            anotherSubObject: {
                subSubObject: {
                    field: 'property',
                },
            },
        });
    };

    it('should work on a complex object', () => {
        let testFixturesComplex;
        inject((_testFixturesComplex_) => {
            testFixturesComplex = _testFixturesComplex_;
        });

        checkComplexObject(testFixturesComplex);
    });

    it('should allow accessing the json during configuration phase', () => {
        let injectedDuringConfig;
        angular
            .module('testModule', ['test/fixtures/complex.json'])
            .config((_testFixturesComplex_) => {
                injectedDuringConfig = _testFixturesComplex_;
            });

        inject(module('testModule'));

        checkComplexObject(injectedDuringConfig);
    });
});
