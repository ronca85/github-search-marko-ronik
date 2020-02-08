const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: "./app/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index_bundle.js",
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: "babel-loader" },
			{ test: /\.(css)$/, use: [ "style-loader", "css-loader" ] },
			{ test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/i,
				use: [ {
					loader: "url-loader",
					options: { limit: 8192 }
				} ]
			}
		],
	},
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: "app/index.html",
		}),
	],
}

