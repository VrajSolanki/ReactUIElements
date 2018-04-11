const path = require('path');

module.exports = {
    entry: '../src/index',
    output: {
    path: 'dist',
    filename: 'bundle.js'
    },
  module: {
    rules: [
      {
        test:/\.scss$/,
        use: ['style-loader', "css-loader?modules", 'sass-loader'],
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-0'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};