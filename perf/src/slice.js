const nofnLib = require('../../lib');
const _ = require('lodash');
const fast = require('fast.js');
const times = 1e4;

let iterable = {};

for (let i = 0; i < 1e3; i++) {
  iterable[i] = i*2;
  iterable.length = i + 1;
}



console.group('slice (clone)');

console.time('Array.prototype.slice');
for(let i = 0; i < times; i++) {
	Array.prototype.slice.call(iterable);
}
console.timeEnd('Array.prototype.slice');

console.time('_.slice');
for(let i = 0; i < times; i++) {
	_.slice(iterable);
}
console.timeEnd('_.slice')



console.time('fast.clone');
for(let i = 0; i < times; i++) {
	fast.clone(iterable);
}
console.timeEnd('fast.clone');



console.time('nofnLib.slice');
for(let i = 0; i < times; i++) {
	nofnLib.slice(iterable);
}
console.timeEnd('nofnLib.slice');


console.time('nofn.slice');
for(let i = 0; i < times; i++) {
	nofn.slice(iterable);
}
console.timeEnd('nofn.slice');

console.groupEnd();
