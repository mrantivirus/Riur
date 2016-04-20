var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    
    entry: [
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
                exclude: [/node_modules/],
                loader: 'babel',
                presets: ["react", "es2015", "stage-0", 'react-hmre']
            }
        ]
    },
    
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}