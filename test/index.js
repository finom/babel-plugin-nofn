var assert = require('assert');
var babel = require('babel-core');
var chalk = require('chalk');
var clear = require('clear');
var diff = require('diff');
var fs = require('fs');
var path = require('path');

require('babel-register');

var pluginPath = require.resolve('../src');

function runTests() {
	var testsPath = __dirname + '/fixtures/';

	fs.readdirSync(testsPath).map(function(item) {
		return {
			path: path.join(testsPath, item),
			name: item,
		};
	}).filter(function(item) {
		return fs.statSync(item.path).isDirectory();
	}).forEach(runTest);
}

function runTest(dir) {
	var output = babel.transformFileSync(dir.path + '/actual.js', {
			presets: [],
			plugins: [pluginPath]
		}),
		success = true;

	var expected = fs.readFileSync(dir.path + '/expected.js', 'utf-8');

	function normalizeLines(str) {
		return str.trimRight().replace(/\r\n/g, '\n');
	}

	process.stdout.write(chalk.bgWhite.black(dir.name));
	process.stdout.write('\n\n');

	diff.diffLines(normalizeLines(output.code), normalizeLines(expected))
	.forEach(function (part) {
		var value = part.value;

		if (part.added) {
			value = chalk.green(part.value);
			success = false;
		} else if (part.removed) {
			value = chalk.red(part.value);
			success = false;
		}


		process.stdout.write(value);
	});

	if(!success) {
		process.stdout.write('\n\n');
		throw Error('Expectation and result of "' + dir.name + '" test case aren\'t the same');
	}

	process.stdout.write('\n\n\n');
}

if (process.argv.indexOf('--watch') >= 0) {
	require('watch').watchTree(__dirname + '/..', function () {
		if(require.cache[pluginPath]) {
			require.cache[pluginPath].children.forEach(function(child) {
				if(child.filename.indexOf('node_modules') == -1) {
					delete require.cache[child.filename];
				}
			});
			delete require.cache[pluginPath];
		}

		clear();
		console.log('Press Ctrl+C to stop watching...');
		console.log('================================');
		try {
			runTests();
		} catch (e) {
			console.error(chalk.magenta(e.stack));
		}
	});
} else {
	runTests();
}
