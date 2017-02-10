const path = require('path')

module.exports = {
  entry: ['./src/main.js'], // ['babel-polyfill', './src/main.js']
  output: {
    path: path.join(__dirname, '/www'),
    filename: 'bundle.js',
    publicPath: ''
  },
  module: {
    loaders: [
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-source-map', // Either 'source-map' or 'cheap-source-map'
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js', // Vue alias for CommonJS module,
      'axios$': 'axios/dist/axios.min.js' // Axios alias to use XMLHttpRequest
    }
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, '/www'),
    proxy: {
      '/php/*': {
        target: 'http://localhost:80/cross-localhost/www',
        changeOrigin: true
      }
    }
  }
}
