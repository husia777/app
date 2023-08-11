const path = require("path");
path;

const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	mode: "development",
	entry: "./frontend/src/app/index.tsx",
	output: {
		filename: "index.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
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
