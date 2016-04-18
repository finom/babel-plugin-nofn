import nofn from '../lib';

describe('nofn.assign', function() {
	it('assigns', function() {
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
});
