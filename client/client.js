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
import { createStore } from 'redux';

import reducers from '../shared/reducers';
import App from '../shared/components/app.component';

const store = createStore(reducers);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // Enable debugger
}

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('content')
)