const path = require('path');
const fs = require('fs');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const envVariables = require('ra-loopback3/webpack-config/env-variables');

let config = {
  entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    envVariables,
    new HtmlWebPackPlugin({
      template: './public/index.html',
      favicon: './public/lock.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new ManifestPlugin({ serialize: () => fs.readFileSync('./public/manifest.json') }),
  ],
  resolve: {
    alias: {
      'ra-loopback3': path.join(__dirname, '..', 'ra-loopback3', 'src'),
    },
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        uglifyOptions: {
          parallel: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 229376,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
    },
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 15000000,
    maxAssetSize: 2000000,
  },
};

module.exports = config;
