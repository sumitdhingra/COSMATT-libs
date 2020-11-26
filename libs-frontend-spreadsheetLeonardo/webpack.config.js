const webpack = require('webpack');

module.exports = {
    entry: './src/spreadsheet-jquery-plugin/spreadsheet-jquery-plugin.ts',
    output: {
        filename: 'spreadsheet-jquery-plugin.js',
        path: __dirname + '/dist'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.ts?$/, loader: "awesome-typescript-loader" }
        ],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};