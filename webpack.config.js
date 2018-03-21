const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const KarmaJasmineMatchersPlugin = require('karma-jasmine-matchers')
const moment = require('moment')
const THREE = require('three')
const RapidAPI = new require('rapidapi-connect')
const rapid = new RapidAPI('default-application_5ab299f8e4b084deb4eaa2c6', 'b2a5eae0-f4a8-4b47-a573-cd7194fb0b11')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'JSTemplate',
      template: './src/index.html',
      inject: 'body'
    })

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: 'eslint-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /three\/examples\/js/,
        use: 'imports-loader?THREE=three'
      }
    ]
  },
  resolve: {
    alias: {
      'three-examples': path.join(__dirname, './node_modules/three/examples/js')
    },
  }
}
