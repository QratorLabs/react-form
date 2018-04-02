const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = function(options={name: 'signup'}) {
  let sourceMap = options.dev;
  let cnf = {
    context: __dirname + "/examples/" + options.name,
    entry: './index.jsx',
    resolve: {
      extensions: ['.webpack.js', '.js', '.jsx'],
      modules: [path.dirname(__dirname), './node_modules'],
    },
    output: {
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        { 
          test: /\.jsx?$/, 
          exclude: path.join(__dirname, 'node_modules'),
          loader: 'babel-loader'
        }
      ]
    },
    devtool: 'inline-source-map',
    plugins: [
      new CopyWebpackPlugin([
        { from: 'index.html', to: 'index.html' },
      ]),
    ]
  };
  return cnf;
};