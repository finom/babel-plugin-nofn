const _ = require('lodash');
const fast = require('fast.js');
const times = 1e3;

let iterable = {},
	j;
for (let i = 0; i < times; i++) {
  iterable['x' + i] = i;
}


console.group('each');

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

console.time('nofn.each');
j = 0;
for(let i = 0; i < times; i++) {
	nofn.each(iterable, (value, key) => {
		j += value;
	});
}
console.timeEnd('nofn.each')




console.groupEnd();
