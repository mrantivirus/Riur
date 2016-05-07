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
const app = express();

import routes from './routes';
import { ENV, PORT } from './config';


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

// Express configs
app.use(express.static('static'));
routes(app);
// END Express configs

app.listen(PORT, () => {
    console.log(`Riur is listening on port ${PORT}`);
});