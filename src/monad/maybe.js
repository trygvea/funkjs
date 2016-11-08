import { forComprehension } from '../for'

// -------------------------------------------------
// Maybe
//
// The simplest possible Maybe, with no wrapping on Just and using
// null as nothing. Is seems weird, but it is quite useful.

// Constructors. Reserve 'Just' and 'Nothing' for types.
export const just = a => a
export const nothing = null

const chainJust = (m, f) => f(m)
const chainNothing = () => nothing
export const chainMaybe = (m, f) =>
    m == nothing
        ? chainNothing(m, f)
        : chainJust(m,f)

export const forMaybe = forComprehension(chainMaybe)
