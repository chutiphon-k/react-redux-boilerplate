const webpack = require('webpack')
const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
	entry: [
		path.resolve(__dirname, '../src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
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
				include: path.resolve(__dirname, '../src')
			}
		]
	},
	plugins: [
		new DashboardPlugin()
	],
	devServer: {
		inline: true,
		host: 'localhost',
		port: 8080,
		historyApiFallback: true
	}
}