/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule app.component
 */

'use strict'

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { HTML } from '../../server/config';

import Footer from './footer.component';
import AddTodo from '../containers/addTodo.container';
import VisibleTodoList from '../containers/visibleTodoList.container';

const App = () => (
    <div>
        <Helmet {...HTML.head}/>
        Welcome to Riur!
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

if (module.hot) {
    module.hot.accept();
}

export default App;