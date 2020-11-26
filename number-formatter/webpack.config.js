const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/NumberFormatter/NumberFormatter.ts',
    entry: {
        "cosmatt-number-formatter": './src/NumberFormatter/NumberFormatter.ts',
        "cosmatt-jquery-number-formatter": './src/JqueryNumberFormatter/JqueryNumberFormatter.ts',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        library: ["Cosmatt"]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts?$/, loader: "awesome-typescript-loader" }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new CopyWebpackPlugin([
            {
                from: 'src/NumberFormatter/NumberFormatter.d.ts'
            },
            {
                from: 'src/NumberFormatter/INumberFormatterOptions.d.ts'
            }
        ])
    ]
};
