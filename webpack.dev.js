const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/template.html",
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
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
    devServer: {
        historyApiFallback: true //server index.html for any route not found
    }
});