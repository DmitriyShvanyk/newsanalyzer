const webpack = require('webpack')

// плагин, который превращает относительный путь в абсолютный
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')

// плагин для чтения css внутри js-кода
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {    
    index: [`./src/js/index.js`, `./src/index.css`],
    project: [`./src/js/project.js`, `./src/project.css`],
    analytics: [`./src/js/analytics.js`, `./src/analytics.css`]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: {
          loader: 'file-loader',
          options: {           
            name: '[path][name].[ext]',
            outputPath: (file) => {
              let path = file.split("src/")[1];   
              return path
            }
          }
        }
      },

      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        }
      }

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/favicon.ico',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/project.html',
      filename: 'project.html',
      chunks: ['project']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/analytics.html',
      filename: 'analytics.html',
      chunks: ['analytics']
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default']
      },
      canPrint: true
    }),
    /*new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          global_defs: {
            '@alert': 'console.log'
          },
          drop_console: true
        }
      }
    })*/
  ]
};