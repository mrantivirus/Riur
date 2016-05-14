/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule login.component
 */

'use strict';

import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

    render() {
        const { errorMessage } = this.props

        return (
            <form>
                <input type='text' ref='email' className="form-control" placeholder='Email' />
                <input type='password' ref='password' className="form-control" placeholder='Password' />
                <button onClick={(event) => this.handleClick(event) } className="btn btn-primary">
                    Login
                </button>

                {errorMessage &&
                    <p>{errorMessage}</p>
                }
            </form>
        );
    }

    handleClick(event) {
        event.preventDefault();
        
        const email = this.refs.email;
        const password = this.refs.password;
        const creds = { email: email.value.trim(), password: password.value.trim() };
        this.props.onLoginClick(creds);
    }
};

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};