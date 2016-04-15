const _ = require('lodash');
const fast = require('fast.js');
const times = 1e6;

//const forOwn = require('lodash/forown');

console.group('assign');





console.time('_.assign');
for(let i = 0; i < times; i++) {
	_.assign({a: Math.random()},{b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()});
}
console.timeEnd('_.assign')

console.time('Object.assign');
for(let i = 0; i < times; i++) {
	Object.assign({a: Math.random()},{b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()});
}
console.timeEnd('Object.assign');

console.time('fast.assign');
for(let i = 0; i < times; i++) {
	fast.assign({a: Math.random()},{b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()});
}
console.timeEnd('fast.assign');

console.time('nofn.assign');
for(let i = 0; i < times; i++) {
	nofn.assign({a: Math.random()},{b: Math.random(),
        c: Math.random(),
        d: Math.random(),
        e: Math.random(),
        f: Math.random(),
        g: Math.random(),
        h: Math.random()});
}
console.timeEnd('nofn.assign')

console.groupEnd();
