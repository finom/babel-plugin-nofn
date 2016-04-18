require('babel-core/register')({
	plugins: process.env.COMPILE ? ['../src'] : []
});

global.chai = require('chai');
global.expect = global.chai.expect;
global.assert = global.chai.assert;

// Load test suites
require('./assign');
require('./forown');
require('./foreach');
require('./slice');
