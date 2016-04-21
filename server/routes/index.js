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
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
let app = express();


// Custom components
import App from '../../shared/components/app.component';
import Html from '../../shared/containers/html.container';
import createStore from '../../shared/store/createStore';
import { PORT } from '../config';

app.use(express.static('static'));

// API Routes
import todos from './todo.routes';
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

app.use(webpackHotMiddleware(compiler));

// END Webpack

// Catch-all for React-Router
app.use('*', (req, res) => {
    const store = createStore();
    
    const asset = {
        javascript: {
            main: 'bundle.js'
        }
    };

    const appContent = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    ) 
    
    const isProd = process.env.NODE_ENV !== 'production' ? false : true;
    
    res.send('<!doctype html>' + renderToString(<Html assets={asset} content={appContent} store={store} isProd={isProd} />));
});

app.listen(PORT, () => {
    console.log(`Riur is listening on port ${PORT}`);
});