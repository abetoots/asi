const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


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
            { from: 'public/css/shell.min.css', to: 'css/' },
            { from: 'public/css/shell.min.css.map', to: 'css/' },
            'public/manifest.json'
        ]),
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
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
        ]
    }
});