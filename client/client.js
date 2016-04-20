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
import createStore from '../shared/store/createStore';

import App from '../shared/components/app.component';

const store = createStore(window.__app_data);

if (window.__isProduction === false) {
    window.React = React; // Enable debugger
}

if (module.hot) {
    module.hot.accept();
}

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)