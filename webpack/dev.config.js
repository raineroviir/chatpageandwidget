const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    // dashboard: ['bootstrap-loader',
    // 'webpack-hot-middleware/client',
    // './src/dashboard/index'],
    widget: ['webpack-hot-middleware/client', './src/widget/widget.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: [/node_modules/, path.join(__dirname, 'src/dashboard')],
            // include: [path.join(__dirname, 'src/common'), path.join(__dirname, 'src/widget')],
            query: {
              presets: [ 'react-hmre', "react", "es2015" , "stage-0" ]
            }
          },
          {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&name=styles/fonts/[name].[ext]',
          },
          {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff2&name=styles/fonts/[name].[ext]',
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream&name=styles/fonts/[name].[ext]',
          },
          {
            test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-otf&name=styles/fonts/[name].[ext]',
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?name=styles/fonts/[name].[ext]',
          },
          {
            test: /\.scss$/,
            loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.(png|jpg|svg|gif)$/,
            loader: 'file-loader?name=images/[name].[ext]',
          }
        ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
    }),
    // new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    // }),
  ],
};
