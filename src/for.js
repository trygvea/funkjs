/**
 * A simulation of a for-comprehension using es6 generators.
 * Here, we  traverse the computations step by step, chaining
 * the steps.
 * (We could easily extend this function by adding the chain
 * method as a parameter, so it can be used by other chainable
 * structures)
 * Taken from https://curiosity-driven.org/monads-in-javascript
 */
export const forComprehension = chain => stepsGenerator => {
    const step = stepsGenerator()
    const nextComputations = previousResult => {
        const {done, value} = step.next(previousResult)
        return done ? value : chain(value, nextComputations)
    }
    return nextComputations()
}
