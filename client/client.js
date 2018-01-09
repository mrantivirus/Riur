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
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import createStore from '../shared/store/createStore';
import ReactGA from 'react-ga';

import routes from '../shared/routes';

const store = createStore(window.__app_data, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV !== 'production') {
    window.React = React; // Enable debugger
    const ReduxDevTool = require('../shared/containers/reduxDevTool.container').default;

    // hydrate the dev tools instead
    const renderable = <Provider store={store}>
                            <div>
                                <Router history={history} routes={routes(store)} />
                                <ReduxDevTool />
                            </div>
                        </Provider>;

    const renderFromServer = (component) => hydrate(component,
        document.getElementById('content')
    );

    renderFromServer(renderable);

    if (module.hot) {
        module.hot.accept();
        renderFromServer(
            <AppContainer>
                {renderable}
            </AppContainer>
        );
    }
}
else { //TODO: Clean this up!
    ReactGA.initialize('UA-000000-01');
    hydrate(
        <Provider store={store}>
            <Router history={history} routes={routes(store)} onUpdate={logPageView} />
        </Provider>,
        document.getElementById('content')
    );
}

function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};