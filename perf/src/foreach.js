const nofnLib = require('../../lib');
const _ = require('lodash');
const fast = require('fast.js');
const times = 2e4;

let iterable = [],
	j;

for (let i = 0; i < 1e3; i++) {
  iterable[i] = i*2;
}


console.group('forEach');

console.time('_.forEach');
j = 0;
for(let i = 0; i < times; i++) {
	_.forEach(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('_.forEach');


console.time('Array.prototype.forEach');
j = 0;
for(let i = 0; i < times; i++) {
	iterable.forEach((value, key) => {
		j += value;
	});
}
console.timeEnd('Array.prototype.forEach');


console.time('fast.forEach');
j = 0;
for(let i = 0; i < times; i++) {
	fast.forEach(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('fast.forEach');



console.time('nofnLib.forEach');
j = 0;
for(let i = 0; i < times; i++) {
	nofnLib.forEach(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('nofnLib.forEach')


console.time('nofn.forEach');
j = 0;
for(let i = 0; i < times; i++) {
	nofn.forEach(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('nofn.forEach')


console.groupEnd();
