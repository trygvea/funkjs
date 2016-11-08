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

        const addMaybes = (a, b) =>
            forMaybe(function*() {
                const v1 = yield a
                const v2 = yield b
                return just(v1+v2)
            })

        it('should work on just(value)', () => {
            expect(
                addMaybes(just(1), just(2))
            ).to.equal(
                just(3)
            )
        });

        it('should work on nothing', () => {
            expect(
                addMaybes(nothing, just(2))
            ).to.equal(
                nothing
            )
        });

        it('should work with values directly', () => {
            expect(
                addMaybes(1, 2)
            ).to.equal(
                just(3)
            ).and.to.equal(
                3
            )
        });

        it('should work with null directly', () => {
            expect(
                addMaybes(null, 2)
            ).to.equal(
                nothing
            )
        });

        it('surprisingly work with undefined! Is this good or bad?', () => {
            expect(
                addMaybes(undefined, 2)
            ).to.equal(
                nothing
            )
        });

    });

    describe('surprising, but useful connections', () => {

        it('nothing is null', () => {
            expect(
                nothing
            ).to.equal(
                null
            )
        });

        it('just(nothing) is the same as nothing', () => {
            expect(
                just(nothing)
            ).to.equal(
                nothing
            )
        });

        it('just(something) is the same as something', () => {
            expect(
                just(3.14)
            ).to.equal(
                3.14
            )
        });

    });



});
