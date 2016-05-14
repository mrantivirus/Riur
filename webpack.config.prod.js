var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'production',
    
    entry: [
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
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            },
            'screw-ie8': true,
            output: {
                comments: true,
                semicolons: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
}