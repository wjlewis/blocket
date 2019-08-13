const path = require('path');

module.exports = {
  entry: './client/src/index.tsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.min.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};
