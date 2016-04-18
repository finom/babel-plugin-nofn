import nofn from '../lib';

describe('nofn.slice', function() {
	const arrayLike = {
			0: 'a',
			1: 'b',
			2: 'c',
			3: 'd',
			4: 'e',
			length: 5
		};



	it('converts array-like object to array', () => {
		const result = nofn.slice(arrayLike);
		assert.instanceOf(result, Array, 'result is instance of Array');
		assert.deepEqual(result, ['a', 'b', 'c', 'd', 'e']);
	});

	// I am really lazy and I don't like to write tests
	// that's bad but just look at these cats https://www.youtube.com/watch?v=tntOCGkgt98
	it('should work just like native slice (only positive args)', () => {
		const nativeSlice = Array.prototype.slice;
		assert.deepEqual(nofn.slice(arrayLike, 2), nativeSlice.call(arrayLike, 2));
		assert.deepEqual(nofn.slice(arrayLike, 1, 3), nativeSlice.call(arrayLike, 1, 3));
	});

});
