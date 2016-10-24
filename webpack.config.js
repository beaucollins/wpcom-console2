const { join } = require( 'path' )
const autoprefixer = require( 'autoprefixer' );
const Html = require( 'html-webpack-plugin' );

module.exports = {
	devtool: 'source-map',
	entry: {
		'path-editor': './page/path-editor',
		main: [ 'whatwg-fetch', './src', './page/main' ]
	},
	output: {
		path: join( __dirname, 'dist' ),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
			{ test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' },
			{ test: /\.json$/, loader: 'json' }
		]
	},
	resolve: {
		extensions: [ '', '.js', '.jsx', '.css', '.scss', '.json' ],
		modulesDirectories: [ __dirname, 'src', 'node_modules' ]
	},
	plugins: [
		new Html( { title: 'WP-API Console', chunks: [ 'main' ] } ),
		new Html( { title: 'Path Editor', filename: 'path.html', chunks: [ 'path-editor' ] } )
	],
	postcss: [ autoprefixer() ]
}
