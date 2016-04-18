module.exports = {
	context: __dirname + "/src",
	entry: "./index",
	output: {
		path: __dirname + "/",
		filename: "perf.bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel', // 'babel-loader' is also a legal name to reference
			query: {
				presets: ['es2015'],
				plugins: ['./../../dist/index.js']
			}
		}]
	}
}
