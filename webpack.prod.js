const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
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
    }
});