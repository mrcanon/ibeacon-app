// Config path output => result then run build
const path = require('path');
const pathOutput = 'assets'
const pathOutputJs = `${pathOutput}/js/`
const pathOutputImg = `${pathOutput}/img/`
const pathOutputFonts = `${pathOutput}/fonts/`

// Config plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

// Check mode development
const isProd = process.env.NODE_ENV === 'production';

const cssDev = [
  {
    loader: 'style-loader'
  },
  {
    loader: 'css-loader'
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true
    }
  }
];

const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ['css-loader', 'sass-loader']
});

const cssConfig = isProd ? cssProd : cssDev;

// Config All
var config = {
  entry: {
    index: './src/index.js',
    static: './src/boilerplate/assets/js/common.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${pathOutputJs}[name].bundle.js`
  },

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, "dist"),
    host: "0.0.0.0",
    publicPath: `/`,
    historyApiFallback: true,
    disableHostCheck: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },

  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   compress: true,
  //   hot: true,
  //   inline: true,
  //   //port: 8080,
  //   //stats: "errors-only",
  //   open: true,
  //   openPage: '',
  //   //host: '172.16.110.117'
  // },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    },
    {
      test: /\.(css|scss)$/,
      use: cssConfig
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        name: `${pathOutputImg}[name]-[hash:6].[ext]`
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: `${pathOutputFonts}[name].[ext]`
          }
        }
      ]
    },
    {
      test: /\.pug/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        },
        {
          loader: 'pug-loader'
        },
        {
          loader: 'pug-html-loader',
          options: {
            pretty: true
          }
        }
      ]
    },
    {
      test: /\.jade$/,
      use: [
        {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        },
        {
          loader: 'jade-html-loader',
          options: {
            pretty: true
          }
        }
      ]
    },
    {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [
          'es2017',
          'es2016',
          'es2015',
          'stage-0',
          'react',

        ],
        plugins: [
          'transform-decorators-legacy',
          'transform-class-properties'
        ]
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
      exclude: /node_modules/
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'index.html',
      template: './src/boilerplate/index.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'history.html',
      template: './src/boilerplate/history.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['static']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'wellcome.html',
      template: './src/boilerplate/wellcome.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['static']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'home.html',
      template: './src/boilerplate/home.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['static']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'login.html',
      template: './src/boilerplate/login.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['static']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'setting.html',
      template: './src/boilerplate/setting.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['static']
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'guide.html',
      template: './src/boilerplate/guide.jade',
      minify: {
        removeComments: isProd
      },
      chunks: ['static']
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: !isProd,
      allChunks: true
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.jade')),
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'masonry': 'masonry-layout',
      'isotope': 'isotope-layout',
      'waypoints': 'waypoints/lib'
    }
  }
}

module.exports = config;
