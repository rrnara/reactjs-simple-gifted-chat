const path = require('path');
const { NODE_ENV, FILE_NAME } = process.env;
const filename = `${FILE_NAME}${NODE_ENV === 'production' ? '.min' : ''}.js`;
module.exports = {
  mode: NODE_ENV || 'development',
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { modules: ['node_modules'] },
  output: {
    path: path.join(__dirname, 'dist'),
    filename,
    libraryTarget: 'umd'
  }
};
