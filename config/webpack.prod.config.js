const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseWebpackConfig = require('./webpack.base.config.js')

const projectRoot = path.resolve(__dirname, '../')

module.exports = merge(baseWebpackConfig, {
	entry: [
		path.resolve(projectRoot, 'src/index.js')
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ['babel'],
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			}, {
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style',
					use: [ {
						loader: 'css',
						options: {
							modules: true,
							minimize: true,
							localIdentName: '[name]__[local]___[hash:base64:5]'
						}
					}, 'postcss' ]
				}),
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			}, {
				test: /\.(scss|sass)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ {
						loader: 'css',
						options: {
							modules: true,
							minimize: true,
							localIdentName: '[name]__[local]___[hash:base64:5]'
						}
					}, 'postcss', 'sass' ]
				}),
				exclude: path.resolve(projectRoot, 'node_modules'),
				include: path.resolve(projectRoot, 'src')
			}, {
				test: /\.(css|scss|sass)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ {
						loader: 'css',
						options: {
							minimize: true
						}
					}, 'postcss', 'sass' ]
				}),
				exclude: path.resolve(projectRoot, 'src'),
				include: path.resolve(projectRoot, 'node_modules')
			}
		]
	},
	plugins: [
		new ProgressBarPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				drop_console: true,
				drop_debugger: true,
				warnings: false
			},
			output: {
				comments: false
			}
		}),
		new HtmlWebpackPlugin({
			filename: path.resolve(projectRoot, 'build/index.html'),
			template: path.resolve(projectRoot, 'public/index.html'),
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true
			}
		}),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new ExtractTextPlugin({
			filename: '[name].[chunkhash].css',
			allChunks: true,
			ignoreOrder: true
		})
	]
})
