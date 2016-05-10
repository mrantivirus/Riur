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
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';


// Custom components
import App from '../../shared/components/app.component';
import Html from '../../shared/containers/html.container';
import createStore from '../../shared/store/createStore';
import routes from '../../shared/routes';


// API Routes
import auth from './auth.routes';
import todos from './todo.routes';


export default (app) => {
    app.use('/auth', auth);
    app.use('/api', todos);
    
    
    // Catch-all for React Router
    app.use((req, res, next) => {
        match({ routes, location:req.url }, (err, redirectLocation, renderProps) => {
            if (err) {
                return res.status(500).send(err);
            }
            
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            
            if (!renderProps) {
                return next();
            }
            
            // Create the redux store.
            const store = createStore();
            
            // Retrieve the promises from React Router components that have a fetchData method.
            //  We use this data to populate our store for server side rendering.
            const fetchedData = renderProps.components
                .filter(component => component.fetchData)
                .map(component => component.fetchData(store, renderProps.params));
            
            // Wait until ALL promises are successful before rendering.
            Promise.all(fetchedData)
                .then(() => {
                    const asset = {
                        javascript: {
                            main: '/js/bundle.js'
                        }
                    };
                    
                    const appContent = renderToString(
                        <Provider store={store}>
                            <RouterContext {...renderProps} />
                        </Provider>
                    ) 
                    
                    const isProd = process.env.NODE_ENV !== 'production' ? false : true;
                    
                    res.send('<!doctype html>' + renderToStaticMarkup(<Html assets={asset} content={appContent} store={store} isProd={isProd} />));
                })
                .catch((err) => {
                    // TODO: Perform better error logging.
                    console.log(err);
                });
        });
    }); 
};

