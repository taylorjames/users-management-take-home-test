/* global require, __dirname, module */
const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new Dotenv({
      // load the corresponding .env file based on the current environment
      path: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  devServer: {
    static: './dist',
  },
};

module.exports = config;
