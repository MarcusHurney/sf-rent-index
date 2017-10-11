const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.join(__dirname, 'build');
const CLIENT_DIR = path.join(__dirname, 'client');

module.exports = {
  entry: CLIENT_DIR,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'images/',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'image-webpack-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'client/index.html' }),
    new ExtractTextPlugin('styles.css'),
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ]
};
