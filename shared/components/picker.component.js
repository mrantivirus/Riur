/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule picker.component
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Picker extends Component {
    render() {
        const { value, onChange, options } = this.props

        return (
            <span>
                <h1>/r/{value}</h1>
                <select onChange={e => onChange(e.target.value) }
                    value={value}>
                    {options.map(option =>
                        <option value={option} key={option}>
                            {option}
                        </option>)
                    }
                </select>
            </span>
        )
    }
}

Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}