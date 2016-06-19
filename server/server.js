/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule server
 */

'use strict'

/* Initialize server modules */
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import responseTime from 'response-time';

import routes from './routes';
import { DATABASE_URL, ENV, PORT, SECRET } from './config';
import jwt from './utils/jwt';


/* Express configs */
const app = express();

// For your app, you may want to consider using a CDN.
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser(SECRET, {
    secure: false, // Set to true if you have HTTPS set up
    httpOnly: true
}));
app.use(responseTime());
app.use(morgan(ENV.isProduction ? 'combined' : 'dev'));
app.use(jwt.extractTokenFromCookie);
routes(app);
// END Express configs

mongoose.connect(DATABASE_URL, (err) => {
    if (err) {
        console.log('Please make sure mongod is running...');
        console.log(err);

        // In your project, you can prevent your server from 
        //  starting if mongo isn't running. I choose not to.
    }

    console.log('Database is connected...');
});

if (!process.env.NODE_ENV) {
    /* Webpack stuff */
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.config.dev');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}
// END Webpack

app.listen(PORT, () => {
    console.log(`Riur is listening on port ${PORT}...`);
});