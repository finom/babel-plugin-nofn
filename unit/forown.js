import nofn from '../lib';

describe('nofn.forOwn', function() {
	it('passes correct arguments', function() {
		let entries = [],
			expected = [['a', 1], ['b', 2], ['c', 3], ['d', 4]];

		nofn.forOwn({
			a: 1,
			b: 2,
			c: 3,
			d: 4
		}, (value, key) => {
			entries.push([key, value]);
		});

		assert.deepEqual(entries, expected);
	});
});
