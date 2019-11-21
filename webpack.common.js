const path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader'] // when 'src' is qncountered, it requires them
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // when these files are required by html loader, we output them with hash
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'media'
                    }
                }

            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
                        }
                    }
                ],
            }
        ]
    }
}