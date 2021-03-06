const HtmlWebPackPlugin = require('html-webpack-plugin')
const LicensePlugin = require('webpack-license-plugin')
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: './src/scripts/index.js',
    ossTable: './src/scripts/ossTable.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['index']
    }),
    new HtmlWebPackPlugin({
      template: './src/oss-licenses.html',
      filename: './oss-licenses.html',
      chunks: ['ossTable']
    }),
    new LicensePlugin()
    ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true,
    port: 5500,
    open: true
 },
 module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource'
      }
    ],
  },
  experiments: {
    topLevelAwait: true
  }
};