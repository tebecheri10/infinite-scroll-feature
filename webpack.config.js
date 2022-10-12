const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require("dotenv-webpack");
const { WEBPACK_IGNORE_COMMENT_REGEXP } = require('css-loader/dist/utils');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8080,
},
module: {
  rules: [
    {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    },
    {
      test: /\.png/,
      type: 'asset/resource',
    }
  ],
},
  mode: "development",
  plugins:[
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new Dotenv()
  ]
};