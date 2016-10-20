import 'babel-polyfill'
import { expect } from 'chai'
import { just, nothing, chainMaybe, forMaybe } from '../../src/monad/maybe'

describe('Monad: maybe', () => {

    describe('without monads', () => {

        it('should work, but looks terrible', () => {
            const chainedNullables = (v1, v2) => {
                if (v1) {
                    if (v2) {
                        return v1 + v2
                    }
                }
                return null
            }
            expect(
                chainedNullables(null, 1)
            ).to.equal(null)
        });

    });

    describe('bind', () => {

        it('should be chainable', () => {
            expect(
                chainMaybe(just(1),
                    v1 => chainMaybe(just(2),
                        v2 => just(v1+v2)))
            ).to.equal(3)
        });

    });


    describe('for-comprehension', () => {

        it('should work on just(value)', () => {
            expect(
                forMaybe(function*() {
                    const v1 = yield just(1)
                    const v2 = yield just(2)
                    return v1+v2
                })
            ).to.equal(3)
        });

        it('should work on nothing', () => {
            expect(
                forMaybe(function*() {
                    const v1 = yield nothing
                    const v2 = yield just(2)
                    return v1+v2
                })
            ).to.equal(nothing)
        });

        it('should work with values directly', () => {
            expect(
                forMaybe(function*() {
                    const v1 = yield 1
                    const v2 = yield 2
                    return v1+v2
                })
            ).to.equal(3)
        });

        it('should work with null directly', () => {
            expect(
                forMaybe(function*() {
                    const v1 = yield null
                    const v2 = yield 2
                    return v1+v2
                })
            ).to.equal(nothing)
        });

        it('surprisingly work with undefined!', () => {
            expect(
                forMaybe(function*() {
                    const v1 = yield undefined
                    const v2 = yield 2
                    return v1+v2
                })
            ).to.equal(nothing)
        });

        it('surprisingly work with nothing at all!', () => {
            expect(
                forMaybe(function*() {
                    const v1 = yield
                    const v2 = yield 2
                    return v1+v2
                })
            ).to.equal(nothing)
        });

    });

});
