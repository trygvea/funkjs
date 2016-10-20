import { forComprehension } from '../for'

// pureStatefulComputation: (state) => [result, newState]

// Constructor
const createComputation = a => state => [a, state]

// ------------------------------------------------------
// Chain a stateful computation with a function returning a
// stateful computation, the result being a stateful computation.
// Using the name 'chain', taken from Fantasyland,
// https://github.com/fantasyland/fantasy-land.
// Similar functions is also known as bind and flatMap.
export const chainComputation = (m, f) =>
    state => {
        const [a, newState] = m(state)
        return f(a)(newState)
    }

export const forComp = forComprehension(chainComputation)
