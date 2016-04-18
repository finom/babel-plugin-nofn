require('babel-core/register')({
	plugins: ['./../../src']
});

const consoleGroup = require('console-group');

if(!console.group) {
	consoleGroup.install();
}


require('./assign');
require('./forown');
require('./foreach');
require('./slice');
