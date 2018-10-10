import nofn from '../lib';

describe('nofn.reduce', function() {
	it('reduces a set of simple numbers', function() {
		let entries = [1, 2, 3, 4],
			expected = 10,
      target;

    target = nofn.reduce(entries, (left, right) => left + right);
		assert.deepEqual(target, expected);
	});

	it('reduces a set of simple numbers with an initial value', function() {
		let entries = [1, 2, 3, 4],
			initialValue = 5,
			expected = 15,
      target;

    target = nofn.reduce(entries, (left, right) => left + right, initialValue);
		assert.deepEqual(target, expected);
	});
});
