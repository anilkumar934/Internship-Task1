const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode : 'development',
    // devtool : 'eval-souce-map',
    entry: './src/index.ts',
    output : {
        // publicPath : 'public',
        path : path.resolve(__dirname,'public'),
        filename : 'bundle.js'
    },
    module : {
        rules:[
            {
                test : /\.ts$/,
                use : 'ts-loader',
                include : [path.resolve(__dirname,'src')]
            },
            {
                test : /\.css$/,
                use : ['style-loader','css-loader']
            }
        ]
    },
    resolve : {
        extensions : ['.ts','.js']
    }
    // plugins : [
    //     new HtmlWebpackPlugin({
    //         title : 'webpack App',
    //         filename : './index.html',
    //     }),
    // ],
}