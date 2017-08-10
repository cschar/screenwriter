
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
// module.exports = {

// NODE_ENV to production    //so react knows to build to production
// uglify

var config = {
	entry: './app/index.js',
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
	},
	module: {
    rules: [
      { test: /\.(js)$/,
        exclude: /server/,
        use: 'babel-loader' },
      
      { test: /\.css$/,
        exclude: /server/,
        use: [ 'style-loader', 'css-loader' ]},
      {
        test: /\.ts(x?)$/,
        use: "babel-loader?presets[]=es2015!ts-loader",
        exclude: /node_modules/
    }
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    new webpack.DefinePlugin({
        'process.env': {
          'SOUNDCLOUD_APP_ID': JSON.stringify(process.env.SOUNDCLOUD_APP_ID)
          // 'NODE_ENV': JSON.stringify('production')
        }
      })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
      //set node environment inside code
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          // 'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    )
}


module.exports = config;
