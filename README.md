# A very simple monad library

This is just me playing with javascript and functional stuff.
It started when I realised that ES6 had become a real language, with lots of nice syntax and new features, and I wanted to learn it better.

What inspired me in the first place was curiositys-dreven's 'monads in javascript' <https://curiosity-driven.org/monads-in-javascript>,
specifically the generator-driven for-comprehension that makes all of the possible. 
I use these generators in all for-comprehensions. 

For monadic concepts and naming, I've looked a bit to fantasyland <https://github.com/fantasyland/fantasy-land>.

I've tried to use the approach of doing 'the simplest thing that could possibly work' wherever possible. Sometimes this works out surprisingly well, even making new possibilites on the way (see for instance #maybe). 
Also, we have #statefulComputations that works on regular functions with a specific signature.

The purpose of this library is mainly to play around - to gain experience with the javascript language
and to gain experience using monads. The total lack of typing probably makes it usefulness limited. 
  
## Running the tests
```
npm install
npm test
```

## Maybe

The simplest approach possible is probably: 
```js
const just = a => a
const nothing = null
```

But does it work? Surprisingly, it does, and there are some positive side effects too.
For instance, say we had the following function to add Maybes:
```js
const addMaybes = (a,b) => 
    forMaybe(function*() {
        const v1 = yield a
        const v2 = yield b
        return just(v1+v2)
    }) 
```
then we can do calls like this:
```js
addMaybes(just(1), just(2)) // Equals just(3)
addMaybes(nothing, just(2)) // Equals nothing
```

But we can also do the following, which makes new ways of handling nulls possible.
```js
addMaybes(1, 2) // Equals 3
addMaybes(null, 2) // Equals null
addMaybes(undefined, 2) // Equals null
```

See more examples in [Maybe testcases] (test/monad/maybeTests.js) 
   
## Stateful computations

Given some stateful computations, for instance
```
const push = elem => stack => [undefined, [elem, ...stack]]
const pop = ([head, ...tail]) => [head, tail]
```
it is very cumbersome to chain those computations, for instance this weird example:
```
const theHardWay = stack => {
    const [first, stack1] = pop(stack)
    const [second, stack2] = pop(stack1)
    return push(first * second)(stack2)
}
console.log("theHardWay:", theHardWay([3,2,1]))   // [undefined, [6,1]]
```
 
Wouldn't it be easier if you could just do:
```
var theEasyWay = forComp(function*() {
    const first = yield pop
    const second = yield pop
    return push(first * second)
})
console.log("theEasyWay:", theEasyWay([3,2,1]))  // [undefined, [6,1]]
``` 
and avoid feeding the state into each invocation? 

Well, it turns out you can. See more examples in [computation testcases] (test/monad/computationTests.js)
 
## Either

Either is work in progress. Right now left and right looks like this:
```
export const left = left => ({left})
export const right = right => ({right})
```
and you can chain eithers like this:
```
var chainEithers = (e1, e2) => forEither(function*() {
    const v1 = yield e1
    const v2 = yield e2
    return right(v1+v2)
})
chainedEithers(left("Failed"), right(2)) // return {left("Failed")}
```
It has not yet turned out to be any more useful than this.

You can see some examples in [computation testcases] (test/monad/computationTests.js)

## Curry

A universal curry-function that takes a function with any number of parameters, and allows one to call it with any lesser number of parameters, returng a function that take (any number of ) the rest of the parameters.
Ie. if you have the follwing function:
```
const f = (a,b,c) => a+b+c
```
You can make a curried version that can be called in any of the following ways:
```
const g = curry(f)
f(1,2,3)   // 6
g(1,2,3)   // 6
g(1)(2)(3) // 6
g(1,2)(3)  // 6
g(1)(2,3)  // 6

```
  
## Other stuff

You may use the second commit in the project ([labelled 'project setup'](https://github.com/trygvea/funkjs/commit/47ea966dc13c3f4703950c0e30c5b037ef5eeef7)) as a template for an es6 project setup with babel and testing via mocha and chai.    


## Further exploration

See [TODO] (TODO.md)
