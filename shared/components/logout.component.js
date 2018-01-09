/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule logout.component
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Logout extends Component {

    render() {
        const { onLogoutClick } = this.props

        return (
            <button onClick={() => onLogoutClick() } className="btn btn-primary">
                Logout
            </button>
        )
    };
};

Logout.propTypes = {
    onLogoutClick: PropTypes.func.isRequired
};