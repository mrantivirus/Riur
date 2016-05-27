var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    
    entry: [
        'webpack-hot-middleware/client',
        './client/client.js'
    ],
    
    output: {
        path: path.resolve('./static/js'),
        filename: 'bundle.js',
        publicPath: '/js'
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
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-0", 'react-hmre']
                }
            }
        ]
    },
    
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ]
}