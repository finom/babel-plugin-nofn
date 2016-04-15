require('babel-core/register')({
	plugins: process.env.COMPILE ? ['../src'] : []
});

require( 'console-group' ).install();
require('./assign');
require('./each');
