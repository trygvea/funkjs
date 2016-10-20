import { expect } from 'chai'
import { curry } from '../src/curry'

// Test it. If
const f = (a,b,c) => a+b+c
const g = curry(f)

describe('Curry', () => {


    it('should work', () => {
        expect(f(1,2,3)).to.equal(6)
        expect(g(1,2,3)).to.equal(6)
        expect(g(1)(2)(3)).to.equal(6)
        expect(g(1,2)(3)).to.equal(6)
        expect(g(1)(2,3)).to.equal(6)
    });

});
