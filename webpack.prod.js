const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    output: {
        filename: '[name].[contentHash].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "public/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new CopyPlugin([
            { from: 'public/img', to: 'img/' },
            'public/manifest.json'
        ]),
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
        new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
        new InjectManifest({ // ! must be last step
            swSrc: './src/service-worker.js'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Moves CSS into separate files
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                './styles/util/_variables.scss',
                                './styles/tools/*.scss',
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader'
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }
            })
        ],
        // https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    },
                },
            },
        }
    }
});