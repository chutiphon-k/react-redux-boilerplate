const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')

const projectRoot = path.resolve(__dirname, '../')

module.exports = {
	output: {
		path: path.resolve(projectRoot, 'build/static')
	},
	resolve: {
		modules: [
			'src',
			'node_modules'
		],
		extensions: ['.jsx', '.js']
	},
	resolveLoader: {
		moduleExtensions: [ '-loader' ]
	},
	module: {
		rules: [
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url?limit=10000&mimetype=application/font-woff'
			}, {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url?limit=10000&mimetype=application/font-woff'
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url?limit=10000&mimetype=application/octet-stream'
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: 'file'
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin([ 'build', 'index.html' ], {
			root: projectRoot
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer()],
				context: __dirname
			}
		})
	]
}
