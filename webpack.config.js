const path = require('path')
module.exports = {
    entry: {app: './src/index.js'},
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './public',
        port:8090
    },
    plugins: [],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    }
};