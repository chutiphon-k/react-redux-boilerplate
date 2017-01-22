process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const baseWebpackConfig = require('./webpack.base.config.js')

const projectRoot = path.resolve(__dirname, '../')

module.exports = merge.smart(baseWebpackConfig, {
	entry: [
		path.resolve(projectRoot, 'src/index.js')
	],
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
            filename: path.resolve(projectRoot,'build/index.html'),
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
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
	]
})