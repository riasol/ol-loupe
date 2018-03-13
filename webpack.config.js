const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env) {
    const isProd=env && env.production
    return {

        entry: {
            app: './src/index.js'
        },
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            port: 8090
        },
        plugins: (function(){return isProd?[new UglifyJSPlugin()]:[]})(),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {loader: 'style-loader'},
                        {loader: 'css-loader',options:{url:false}}
                    ]
                }
            ]
        }
    }
};