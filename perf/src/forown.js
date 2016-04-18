const nofnLib = require('../../lib');
const _ = require('lodash');
const fast = require('fast.js');
const times = 1e3;

let iterable = {},
	j;
for (let i = 0; i < 1e3; i++) {
  iterable['x' + i] = i;
}


console.group('forOwn');

console.time('for .. in');
j = 0;
for(let i = 0; i < times; i++) {
	for(let prop in iterable) if(iterable.hasOwnProperty(prop)) {
		j += iterable[prop];
	}
}
console.timeEnd('for .. in')


console.time('_.forOwn');
j = 0;
for(let i = 0; i < times; i++) {
	_.forOwn(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('_.forOwn')


console.time('fast.forEach');
j = 0;
for(let i = 0; i < times; i++) {
	fast.forEach(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('fast.forEach');



console.time('nofnLib.forOwn');
j = 0;
for(let i = 0; i < times; i++) {
	nofnLib.forOwn(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('nofnLib.forOwn');


console.time('nofn.forOwn');
j = 0;
for(let i = 0; i < times; i++) {
	nofn.forOwn(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('nofn.forOwn');


console.groupEnd();
