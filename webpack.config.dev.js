var webpack = require('webpack');

module.exports = {
    //context: __dirname + '/shared',
    
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './client/client.js'
    ],
    
    output: {
        path: __dirname + '/',
        filename: 'bundle.js',
        publicPath: '/'
    },
    
    resolve: {
        extensions: ['', '.js'],
        moduleDirectories: [
            'node_modules'
        ]
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /.+\.config.js/],
                loader: 'babel-loader',
                // query: {
                //     presets: ['react-hmre']
                // }
            }
        ]
    },
    
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}