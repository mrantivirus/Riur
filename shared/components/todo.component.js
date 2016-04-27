/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.component
 */

'use strict';

import React, { Component, PropTypes } from 'react';

class Todo extends Component {
    render() {
        return (
            <li
                onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.isCompleted ? 'line-through' : 'none'
                }}
            >
                {this.props.text}
            </li>
        );
    }
};

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export default Todo;