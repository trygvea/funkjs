import { forComprehension } from '../for'

// -------------------------------------------------
// Either
//

// Constructors. Reserve Capital names for types.
export const left = left => ({left})
export const right = right => ({right})

const chainLeft = (m, f) => left(m.left)
const chainRight = (m, f) => f(m.right)
export const chainEither = (m, f) =>
    'left' in m
        ? chainLeft(m,f)
        : chainRight(m,f)

export const forEither = forComprehension(chainEither)
