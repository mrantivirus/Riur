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

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, HomePage, RedditPage, TodoPage } from './pages';

const routes = (
    <Route path='/' component={App} >
        <IndexRoute component={HomePage} />
        <Route path='/reddit' component={RedditPage} />
        <Route path='/todo' component={TodoPage} />
    </Route>
);

export default routes;