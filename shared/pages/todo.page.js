/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.page
 */

'use strict';

import React from 'react';
import Helmet from 'react-helmet';

import Footer from '../components/footer.component';
import AddTodo from '../containers/addTodo.container';
import VisibleTodoList from '../containers/visibleTodoList.container';

const TodoPage = () => (
    <div>
        <Helmet title='TodoApp' />
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
);

export default TodoPage;