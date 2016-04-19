/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule routes
 */

'use strict';

// Packages
import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { createStore } from 'redux';

// Custom components
import App from '../../shared/app';
import Html from '../../shared/containers/html.container';
import { PORT } from '../config';
import reducers from '../../shared/reducers';

// API Routes
import todos from './todo.routes';

let app = express();
app.use('/api/todos', todos);
// END API Routes

// Webpack stuff
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';

let compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {}));

// END Webpack

// Catch-all for React-Router
app.use('*', (req, res) => {
    const store = createStore(reducers);
    
    const asset = {
        javascript: {
            main: 'bundle.js'
        }
    };

    const appContent = ReactDom.renderToString(<App />) 
    
    res.send('<!doctype html>' + ReactDom.renderToString(<Html assets={asset} content={appContent} store={store} />));
});

app.listen(PORT, () => {
    console.log(`Riur is listening on port ${PORT}`);
});