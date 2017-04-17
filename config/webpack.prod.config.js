const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const baseWebpackConfig = require('./webpack.base.config.js')
const packageDotJson = require('../package.json')

const projectRoot = path.resolve(__dirname, '../')
const ignorePackage = ['font-awesome', 'bulma']

module.exports = merge(baseWebpackConfig, {
	entry: {
		bundle: path.resolve(projectRoot, 'src/index.js'),
		vendor: Object.keys(packageDotJson.dependencies).filter(function (el) {
			return !ignorePackage.includes(el)
		}),
		style: [ 'bulma/bulma.sass', 'font-awesome/css/font-awesome.min.css' ]
	},
	output: {
		publicPath: '/static/',
		filename: '[chunkhash].bundle.js',
		chunkFilename: '[id].[chunkhash].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel?cacheDirectory',
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
			sourceMap: true,
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
			title: 'React Redux Boilerplate',
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
		}),
		new webpack.DefinePlugin({
			__DEBUG__: 'false'
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production'
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].bundle.js',
			minChunks: function (module) {
				return module.context && module.context.indexOf('node_modules') !== -1
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),
		new ManifestPlugin({
			filename: 'manifest.json',
			manifestVariable: 'webpackManifest'
		}),
		new InlineManifestWebpackPlugin({
			name: 'webpackManifest'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		})
	]
})
