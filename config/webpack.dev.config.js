const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.config.js')

const projectRoot = path.resolve(__dirname, '../')

module.exports = merge(baseWebpackConfig, {
	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server'
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel', 'eslint'],
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			}, {
				test: /\.css$/,
				use: [
					'style',
					'css',
					'postcss'
				]
			}, {
				test: /\.(scss|sass)$/,
				use: [
					'style',
					'css',
					'postcss',
					'sass'
				]
			}
		]
	},
	plugins: [
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(projectRoot, 'public/index.html')
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		inline: false,
		hot: true,
		host: 'localhost',
		port: 8080,
		historyApiFallback: true,
		quiet: true
	}
})
