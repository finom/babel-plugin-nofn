import nofn from '../lib';

describe('nofn.forEach', function() {
	it('passes correct arguments', function() {
		let entries = [],
			expected = [[0, 1], [1, 2], [2, 3], [3, 4]];

		nofn.forEach([1, 2, 3, 4], (value, index) => {
			entries.push([index, value]);
		});

		assert.deepEqual(entries, expected);
	});
});
