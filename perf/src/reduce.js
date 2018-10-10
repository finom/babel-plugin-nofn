const nofnLib = require('../../lib');
const _ = require('lodash');
const fast = require('fast.js');
const times = 2e4;

let iterable = [1, 2, 3, 4],
	initial = 5,
	expected = 15,
	j;


console.group('reduce');

console.time('_.reduce');
j = 0;
for(let i = 0; i < times; i++) {
	_.reduce(iterable, (left, right) => left + right, initial);
}
console.timeEnd('_.reduce');


console.time('Array.prototype.reduce');
j = 0;
for(let i = 0; i < times; i++) {
	iterable.reduce((left, right) => left + right, initial);
}
console.timeEnd('Array.prototype.reduce');


console.time('fast.reduce');
j = 0;
for(let i = 0; i < times; i++) {
	fast.reduce(iterable, (left, right) => left + right, initial);
}
console.timeEnd('fast.reduce');



console.time('nofnLib.reduce');
j = 0;
for(let i = 0; i < times; i++) {
	nofnLib.reduce(iterable, (left, right) => left + right, initial);
}
console.timeEnd('nofnLib.reduce')


console.time('nofn.reduce');
j = 0;
for(let i = 0; i < times; i++) {
	nofn.reduce(iterable, (left, right) => left + right, initial);
}
console.timeEnd('nofn.reduce')


console.groupEnd();
