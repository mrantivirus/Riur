/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule link.component
 */

'use strict';

import React, { Component, PropTypes } from 'react';

class Link extends Component {
    render() {
        if (this.props.active) {
            return <span>{this.props.children}</span>
        }
        
        return (
            <a href='#'
                onClick={e => {
                    e.preventDefault();
                    this.props.onClick();
                }}
            >
                {this.props.children}
            </a>
        )
    }
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;