var webpack = require('webpack');

module.exports = {
    devtool: 'production',
    
    entry: [
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
            'node_modules', 'shared'
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
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}