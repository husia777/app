const path = require("path");
path;

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	mode: "development",
	entry: "./src/app/index.tsx",
	output: {
		path: "/home/husein/Desktop/app/frontend/src",
		filename: "index.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts", ".html", ".scss"],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
					{ loader: "sass-loader" },
				],
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	plugins: [new HtmlWebpackPlugin()],
};
