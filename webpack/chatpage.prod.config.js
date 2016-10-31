const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')
module.exports = {
  devtool: 'eval',
  entry: {
    chatpage: './src/chatpage/chatpage'
  },
  output: {
    path: path.join(__dirname, '..', '/dist/chatpage'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            include: [path.join(__dirname, '..', 'src/common'), path.join(__dirname, '..', 'src/chatpage')],
            query: {
              presets: ["react", "es2015" , "stage-0" ]
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
  }
};
