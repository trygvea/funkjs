import { expect } from 'chai'
import { chainComputation } from '../../src/monad/computation'
import { forComp } from '../../src/monad/computation'

// push & pop as pure stateful computations
const push = elem => stack => [undefined, [elem, ...stack]]
const pop = ([head, ...tail]) => [head, tail]

describe('Monad: pure stateful computation', () => {

    describe('without monads', () => {
        it('should work, but looks terrible', () => {
            const chainedComputation = stack => {
                const [first, stack1] = pop(stack)
                const [second, stack2] = pop(stack1)
                return push(first * second)(stack2)
            }
             expect(
                chainedComputation([3,2,1])
            ).to.deep.equal([undefined, [6,1]])
        });

    });

    describe('bind', () => {

        // chained computations.
        // The state is not part of the definition, which is good,
        // but the implementation is even more messy than stackManip
        // version 1. Read on...
        it('should be chainable', () => {
            const chainedComputation =
                chainComputation(
                    pop,
                    first => chainComputation(
                        pop,
                        second => push(first*second)))
            expect(
                chainedComputation([3,2,1])
            ).to.deep.equal([undefined, [6,1]])
        });

    });

    describe('for-comprehension', () => {

        it('should work, and looks good', () => {
            var chainedComputation =
                forComp(function*() {
                    const first = yield pop
                    const second = yield pop
                    return push(first * second)
                })
            expect(
                chainedComputation([3,2,1])
            ).to.deep.equal([undefined, [6,1]])
        });

    });

});

// var stackManip4 = stack => forC(function*() {
//     const foo = yield push(10)
//     const bar = yield stackManip3
//     return push(bar)
// })(stack)
// console.log("stackManip4:", stackManip4([3,2,1]))  // [99, [6,1]]
//
// var sm5 = function*() {
//     const foo = yield push(11)
//     const bar = yield stackManip3
//     return push(bar)
// }
// console.log("stackManip5:", forC(sm5)([3,2,1]))  // [99, [6,1]]
//
