const path = require('path')

module.exports = {
    mode : 'development',
    entry: './src/index.ts',
    output : {
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
            },
        ]
    },
}