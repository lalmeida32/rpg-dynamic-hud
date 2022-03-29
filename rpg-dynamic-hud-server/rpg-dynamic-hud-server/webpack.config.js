const path = require('path');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'production',
  output: {
    path: distPath,
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: srcPath,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', srcPath],
    extensions: ['.ts', '.js'],
  },
  target: 'node',
};
