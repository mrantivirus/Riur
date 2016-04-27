/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todoList.component
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import Todo from './todo.component';

class TodoList extends Component {
    render() {
        return (
            <ul>
                {this.props.todos.map(todo =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={() => this.props.onTodoClick(todo.id)}
                    />
                )}
            </ul>
        );
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList;