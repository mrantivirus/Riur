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

// Initialize server modules
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import morgan from 'morgan';

import routes from './routes';
import { ENV, PORT, SECRET } from './config';


// Express configs
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
routes(app);
// END Express configs

// Webpack stuff
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

if (!ENV.isProduction) {
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
    console.log(`Riur is listening on port ${PORT}`);
});