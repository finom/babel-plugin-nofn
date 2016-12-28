import nofn from '../lib';

describe('nofn.map', function() {
	it('passes correct arguments', function() {
		let entries = [1, 2, 3, 4],
			expected = [2, 4, 6, 8],
      target;

    target = nofn.map(entries, (value, index) => value * 2);

		assert.deepEqual(target, expected);
	});
});
