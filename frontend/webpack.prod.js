const path = require("path");
var BUILD_DIR = path.resolve(__dirname, "./build/");
var APP_DIR = path.resolve(__dirname, "src/app");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.prod.js");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = merge(common, {
	performance: {
		hints: false,
	},
	devServer: {
		watchFiles: ["./build/"],
		historyApiFallback: true,
		static: {
			directory: "./build/",
			watch: true,
		},
		compress: true,
		port: 3000,
	},
	mode: "production",
	entry: APP_DIR + "/index.tsx",
	output: {
		publicPath: "/",
		path: BUILD_DIR,
		filename: "index.js",
	},
	resolve: {
		extensions: [".js", ".jsx", ".tsx", ".ts", ".html", ".scss", ".css"],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: [/\.s[ac]ss$/i],
				use: [
					{ loader: "style-loader" }, // to inject the result into the DOM as a style block
					{ loader: "css-modules-typescript-loader" }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{ loader: "css-loader", options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{ loader: "resolve-url-loader" },
					{
						loader: "sass-loader",
						options: {
							sourceMap: true, // <-- !!IMPORTANT!!
						},
					}, // to convert SASS to CSS
					// NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
				],
			},
			{
				test: [/\.tsx?$/],
				use: "ts-loader",
			},
			{
				test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
				type: "asset/resource",
			},
		],
	},
	plugins: [
		new NodePolyfillPlugin(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			favicon: "./src/assets/icon/favicon.ico",
		}),
		new Dotenv({
			path: "./.env",
		}),
	],
});
