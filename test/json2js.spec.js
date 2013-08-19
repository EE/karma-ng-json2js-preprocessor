describe('json2j preprocessor', function () {
    'use strict';

    beforeEach(module('test/fixtures/empty.json'));
    beforeEach(module('test/fixtures/complex.json'));

    it('should work on an empty object', function () {
        var testFixturesEmpty;
        inject(function (_testFixturesEmpty_) {
            testFixturesEmpty = _testFixturesEmpty_;
        });

        expect(testFixturesEmpty).toEqual({});
    });

    it('should work on a complex object', function () {
        var testFixturesComplex;
        inject(function (_testFixturesComplex_) {
            testFixturesComplex = _testFixturesComplex_;
        });

        expect(testFixturesComplex).toEqual({
            field: 'property',
            subObject: [
                'arrayElem1',
                'arrayElem2'
            ],
            anotherSubObject: {
                subSubObject: {
                    field: 'property'
                }
            }
        });
    });
});
