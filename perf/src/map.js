const nofnLib = require('../../lib');
const _ = require('lodash');
const fast = require('fast.js');
const times = 2e4;

let iterable = [],
	j;

for (let i = 0; i < 1e3; i++) {
  iterable[i] = i*2;
}


console.group('map');

console.time('_.map');
j = 0;
for(let i = 0; i < times; i++) {
	_.map(iterable, (value, key) => {
		j += value;
		return j;
	});
}
console.timeEnd('_.map');


console.time('Array.prototype.map');
j = 0;
for(let i = 0; i < times; i++) {
	iterable.map((value, key) => {
		j += value;
    return j;
	});
}
console.timeEnd('Array.prototype.map');


console.time('fast.map');
j = 0;
for(let i = 0; i < times; i++) {
	fast.map(iterable, (value, key) => {
		j += value;
    return j;
	});
}
console.timeEnd('fast.map');



console.time('nofnLib.map');
j = 0;
for(let i = 0; i < times; i++) {
	nofnLib.map(iterable, (value, key) => {
		j += value;
    return j;
	});
}
console.timeEnd('nofnLib.map')


console.time('nofn.map');
j = 0;
for(let i = 0; i < times; i++) {
	nofn.map(iterable, (value, key) => {
		j += value;
    return j;
	});
}
console.timeEnd('nofn.map')


console.groupEnd();
