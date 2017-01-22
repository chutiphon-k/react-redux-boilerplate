const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')

const projectRoot = path.resolve(__dirname, '../')

module.exports = {
	entry: [
		'bulma/bulma.sass',
		'font-awesome/css/font-awesome.min.css'
	],
	output: {
		path: path.resolve(projectRoot, 'build/static'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.jsx', '.js']
	},
	resolveLoader: {
		moduleExtensions: ["-loader"] 
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel'],
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			},{
				test: /\.css/,
				use: [
					'style', 
					'css',
					'postcss'
				],
			},{
				test: /\.(scss|sass)$/,
				use: [
					'style',
					'css',
					'postcss',
					'sass'
				],
			},{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: "url?limit=10000&mimetype=application/font-woff"
			},{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: "url?limit=10000&mimetype=application/font-woff"
			},{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: "url?limit=10000&mimetype=application/octet-stream"
			},{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: "file"
			},{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: "url?limit=10000&mimetype=image/svg+xml"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['build','index.html'], {
			root: projectRoot,
		}),
	    new webpack.DefinePlugin({}),
	    new webpack.LoaderOptionsPlugin({
	      options: {
			postcss: [autoprefixer()],
	        context: __dirname,
	      }
	    })
	]
}