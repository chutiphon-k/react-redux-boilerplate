const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.config.js')

const projectRoot = path.resolve(__dirname, '../')

module.exports = merge(baseWebpackConfig, {
	plugins: [
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(projectRoot, 'public/index.html')
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