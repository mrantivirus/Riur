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

import React from 'react';
import Helmet from 'react-helmet';
import { HTML } from '../../server/config';

import Footer from './footer.component';
import AddTodo from '../containers/addTodo.container';
import VisibleTodoList from '../containers/visibleTodoList.container';
import Reddit from '../containers/reddit.container';

const App = () => (
    <div>
        <Helmet {...HTML.head}/>
        <h1>Welcome to Riur!</h1>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
        <br />
        <Reddit />
    </div>
);

export default App;