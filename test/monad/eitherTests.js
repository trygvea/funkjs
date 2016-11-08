import 'babel-polyfill'
import { expect } from 'chai'
import { left, right, chainEither, forEither } from '../../src/monad/either'

describe('Either', () => {

    describe('bind', () => {

        it('should be chainable', () => {
            expect(
                chainEither(right(1),
                    v1 => chainEither(right(2),
                        v2 => right(v1+v2)))
            ).to.deep.equal({right:3})
        });

    });


    describe('for-comprehension', () => {

        it('should work on right(value)', () => {
            expect(
                forEither(function*() {
                    const v1 = yield right(1)
                    const v2 = yield right(2)
                    return right(v1+v2)
                })
            ).to.deep.equal({right:3})
        });

        it('should work on left', () => {
            expect(
                forEither(function*() {
                    const v1 = yield left("Failed")
                    const v2 = yield right(2)
                    return right(v1+v2)
                })
            ).to.deep.equal({left:"Failed"})
        });


    });

});
