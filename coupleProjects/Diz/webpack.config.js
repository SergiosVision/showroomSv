const webpack = require('webpack')
const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const env = !!config.env && config.env || 'development'
const cacheBoosting = config.cacheBoosting

module.exports = {
    entry: ['babel-polyfill', './src/app.tsx'],
    output: {
        path: __dirname + '/public/build/',
        publicPath: '/build/',
        chunkFilename: cacheBoosting ? '[name].[chunkhash].js' : '[name].bundle.js',
        filename: cacheBoosting ? 'bundle-[hash:8].js' : 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.png', '.jpeg', '.jpg', '.svg', '.css'],
        modules: ['node_modules', 'src']
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: __dirname + '/public/index.html',
            template: __dirname + '/public/index-template.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                SERVICE_URL: JSON.stringify(config.path),
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true
        }),
        new ExtractTextPlugin({
            filename: cacheBoosting ? 'styles-[hash:8].css' : 'styles.css',
            allChunks: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }, {
                    loader: 'ts-loader'
                }]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                            minimize: true,
                            localIdentName: '[name]--[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('postcss-short'),
                                    require('postcss-cssnext')
                                ]
                            },
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            }, {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[hash].[ext]'
                    }
                }
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[hash].[ext]'
                }
            }, {
                test: /\.json$/,
                use: {
                    loader: 'json-loader'
                }
            }
        ]
    }
}

if (env === 'production') {
    module.exports.plugins.push(new UglifyJsPlugin())
}
