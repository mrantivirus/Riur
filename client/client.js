/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule client
 */

'use strict'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createStore from '../shared/store/createStore';

import routes from '../shared/routes';

const store = createStore(window.__app_data);
const history = browserHistory;

if (window.__isProduction === false) {
    window.React = React; // Enable debugger
}

if (module.hot) {
    module.hot.accept();
}

render (
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('content')
)