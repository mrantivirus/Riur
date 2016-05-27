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
import React from 'react';
import { dispatch } from 'redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import jwt from '../utils/jwt';


// Custom components
import App from '../../shared/components/app.component';
import Html from '../../shared/containers/html.container';
import createStore from '../../shared/store/createStore';
import routes from '../../shared/routes';
import { serverLogin } from '../../shared/actions';

// API Routes
import auth from './auth.routes';
import todos from './todo.routes';


export default (app) => {
    app.use('/auth', auth);
    app.use('/api', todos);


    // Catch-all for React Router
    app.use((req, res, next) => {
        // Create the redux store and history
        //  NOTE: Using syncHistoryWithStore on the server causes double history
        const history = createMemoryHistory(req.originalUrl);
        const store = createStore({}, history);
        
        // Check is a token was sent from the client
        if (typeof req.token !== 'undefined') {
            // Verify that it's valid
            jwt.verifyPromiseBased(req.token)
                .then((contents) => {
                    // Token is valid, dispatch authentication
                    store.dispatch(serverLogin(contents.user));
                    doRouteMatching(req, res, next, store, history);
                })
                .catch((err) => {
                    console.log('Token err:', err);
                    return req.status(401).send('There was an issue verifying your token.')
                });
        } else {
            // Do normal react-router rendering
            doRouteMatching(req, res, next, store, history);
        }
    });
};

const doRouteMatching = (req, res, next, store, history) => {
    match({ history, routes:routes(store), location: req.originalUrl }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
            return next();
        }
        
        // Retrieve the promises from React Router components that have a fetchData method.
        //  We use this data to populate our store for server side rendering.
        const fetchedData = renderProps.components
            .filter(component => component.fetchData)
            .map(component => component.fetchData(store, renderProps.params));

        // Wait until ALL promises are successful before rendering.
        Promise.all(fetchedData)
            .then(() => {
                const appContent = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>
                )

                const isProd = process.env.NODE_ENV !== 'production' ? false : true;

                res.send('<!doctype html>' + renderToStaticMarkup(<Html content={appContent} store={store} isProd={isProd} />));
            })
            .catch((err) => {
                // TODO: Perform better error logging.
                console.log(err);
            });
    });
};