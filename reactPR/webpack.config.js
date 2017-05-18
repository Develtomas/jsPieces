var webpack = require('webpack');
var path = require('path');

module.exports = 
{

    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/',
        filename: "bundle.js"
    },


    devServer: {
        contentBase: 'public',
        compress: true,
        port: 8090
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourcemap: true,
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                drop_console: true
            },
            mangle: {
                except: [
                    '$', 'webpackJsonp'
                ],
                screw_ie8: true,
                keep_fnames: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
    ],

	module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                use: {
                    loader: 'babel-loader' 
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings 
                }, {
                    loader: "css-loader" // translates CSS into CommonJS 
                }, {
                    loader: "less-loader" // compiles Less to CSS 
                }],
                exclude: [/node_modules/, /public/]
            },
            {
                test:   /\.(png|gif|svg|jpg?)(\?.+)?$/,
                use: {
                    loader: 'url-loader',
                    options:  {
                        limit: 20000
                    }
                }
            },
            {
                test: /\.jsx$/,
                exclude: [/node_modules/, /public/],
                use: {
                    loader: 'babel-loader' 
                }
            }
        ]
    }
}