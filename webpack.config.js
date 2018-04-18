const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bulletin.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: `style-loader!css-loader?module&importLoaders=1!postcss-loader`,
      },
    ],
  },
  target: 'node',
  externals: ['react', 'react-dom', 'prop-types', 'rc-animate'],
}
