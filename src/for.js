/**
 * A simulation of a for-comprehension using es6 generators.
 * Here, we  traverse the computations step by step, chaining
 * the steps using the provided chainer function.
 * Taken from https://curiosity-driven.org/monads-in-javascript
 */
export const forComprehension = chainer => stepsGenerator => {
    const step = stepsGenerator()
    const nextComputations = previousResult => {
        const {done, value} = step.next(previousResult)
        return done ? value : chainer(value, nextComputations)
    }
    return nextComputations()
}
