const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
	entry: {
		app: ['./assets/src/js/app.js', './assets/src/scss/main.scss'],
	},
	output: {
		path: path.resolve(__dirname, './assets'),
		filename: 'js/[name].js',
		hotUpdateChunkFilename: 'hot/[id].[fullhash].hot-update.js',
		hotUpdateMainFilename: 'hot/[runtime].[fullhash].hot-update.json'
	},
	module: {
		rules: [
			{
				test: /\.(c|sc|sa)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css", // change this RELATIVE to your output. (assets)!
			chunkFilename: "css/[name].css"
		})
	],
	devServer: {
		// allowedHosts: [
		// 	'*'
		// ],
        host: '0.0.0.0',
        allowedHosts: 'all',
		headers: { 'Access-Control-Allow-Origin': '*' },
		devMiddleware: {
			writeToDisk: true
		}
	},

}
