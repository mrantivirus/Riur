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

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Footer from '../components/footer.component';
import AddTodo from '../containers/addTodo.container';
import VisibleTodoList from '../containers/visibleTodoList.container';
import { getTodos } from '../actions';

class TodoPage extends Component {
    componentDidMount() {
        this.props.dispatch(getTodos());
    }
    
    render() {
        return (
            <div>
                <Helmet title='TodoApp' />
                <h1>This is a simple Todo App</h1>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        );
    }
}

export default connect()(TodoPage);