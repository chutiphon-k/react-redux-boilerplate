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
		'webpack/hot/only-dev-server',
		path.resolve(projectRoot, 'src/index.js')
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
				use: [ 'style', {
					loader: 'css',
					options: {
						modules: true,
						localIdentName: '[path][name]__[local]--[hash:base64:5]'
					}
				}, 'postcss' ],
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			}, {
				test: /\.(scss|sass)$/,
				use: [ 'style', {
					loader: 'css',
					options: {
						modules: true,
						localIdentName: '[name]__[local]___[hash:base64:5]'
					}
				}, 'postcss', 'sass' ],
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			}, {
				test: /\.(css|scss|sass)$/,
				use: [ 'style', 'css', 'postcss', 'sass' ],
				exclude: path.resolve(projectRoot, 'src'),
				include: path.resolve(projectRoot, 'node_modules')
			}
		]
	},
	plugins: [
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(projectRoot, 'public/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__DEBUG__: 'true'
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development'
		})
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
