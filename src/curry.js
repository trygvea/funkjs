/**
 *
 */
export const curry = f => (...args) =>
    args.length >= f.length
        ? f(...args)
        : (...more) => curry(f)(...args, ...more)