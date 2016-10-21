const { join } = require( 'path' )
const autoprefixer = require( 'autoprefixer' );
const Html = require( 'html-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	entry: [ 'whatwg-fetch', './src/'],
	output: { path: join( __dirname, 'dist' ), filename: 'bundle.js' },
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
			{ test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' },
		]
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.css', '.scss' ],
		modulesDirectories: [ __dirname, 'src', 'node_modules' ]
	},
	plugins: [
		new Html( { title: 'WP-API Console' } )
	],
	postcss: [ autoprefixer() ]
}
