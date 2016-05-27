/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule createReduxStore
 */

'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { selectSubreddit, fetchPosts } from '../actions';


const createEnhancers = (history) => {
    if (process.env.NODE_ENV !== 'production') {
        return compose(
            applyMiddleware(thunk, routerMiddleware(history)),
            require('../containers/reduxDevTool.container').default.instrument()
        );
    }
    
    return applyMiddleware(thunk, routerMiddleware(history));
}

export default function createReduxStore(initialState = {}, history) {
    const store = createStore(reducers, initialState, createEnhancers(history));

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
        });
    }

    return store;
};
