const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		'build/bundle': ['./src/main.ts']
	},
	resolve: {
		alias: {
			svelte: path.dirname(require.resolve('svelte/package.json'))
		},
		extensions: ['.mjs', '.js', '.ts', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: path.join(__dirname, '/public'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /node_modules/
				},
				{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod,
							preprocess: sveltePreprocess({ sourceMap: !prod })
					}
				}
			},
			{
				test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			},
			{
				test: /\.ttf$/,
				type: "asset/resource"
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
	}
};
