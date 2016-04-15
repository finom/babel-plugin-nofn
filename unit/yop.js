import nofn from '../lib';

describe('Module', function() {

	// Test
	it('-', function() {
		assert.deepEqual(nofn.assign({
			a: 1,
			b: 2
		}, {
			c: 3,
			d: 4
		}), {
			a: 1,
			b: 2,
			c: 3,
			d: 4
		});
	});

	it('-', function() {
		let entries = [],
			expected = [['a', 1], ['b', 2], ['c', 3], ['d', 4]];

		nofn.each({
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
