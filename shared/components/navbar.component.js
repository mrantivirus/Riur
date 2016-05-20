/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule navbar.component
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import Login from './login.component';
import Logout from './logout.component';
import { loginUser, logoutUser } from '../actions';

class Navbar extends Component {
    render() {
        const { dispatch, auth } = this.props;
        const { isAuthenticated, errorMessage } = auth;

        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#collapsed-navbar' aria-expanded='false'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <Link className='navbar-brand' to='/'>{this.props.brand}</Link>
                    </div>

                    <div className='collapse navbar-collapse' id='collapsed-navbar'>
                        <ul className='nav navbar-nav'>
                            {this.props.links.map((val, index) => {
                                return (
                                    <li key={index} className={this.props.router.isActive(val.url) ? "active" : ""} >
                                        <Link to={val.url}>{val.text}</Link>
                                    </li>
                                );
                            }) }
                        </ul>

                        <div className='navbar-right navbar-form'>
                            {!isAuthenticated &&
                                <Login
                                    errorMessage={errorMessage}
                                    onLoginClick={creds => dispatch(loginUser(creds)) } />
                            }

                            {isAuthenticated &&
                                <Logout onLogoutClick={() => dispatch(logoutUser()) } />
                            }
                        </div>
                    </div>

                </div>
            </nav>
        );
    };
};

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

// Navbar.contextTypes = {
//     router: function () {
//     return React.PropTypes.func.isRequired;
//   }
// };

export default withRouter(Navbar);