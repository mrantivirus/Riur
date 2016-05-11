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
import Login from './login.component';
import Logout from './logout.component';
import { loginUser, logoutUser } from '../actions';

class Navbar extends Component {
    constructor (props) {
        super(props);
    };
    
    render () {
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
                        <a className='navbar-brand' href='/'>{this.props.brand}</a>
                    </div>
                    
                    <div className='collapse navbar-collapse' id='collapsed-navbar'>
                        <ul className='nav navbar-nav'>
                            {this.props.links.map((val, index) => {
                                return (
                                    <li key={index} className={this.props.pathname === val.url ? 'active' : ''}>
                                        <a href={val.url}>{val.text}</a>
                                    </li>
                                );
                            })}
                        </ul>
                        
                        <div className='pull-right'>
                            {!isAuthenticated && 
                                <Login 
                                errorMessage={errorMessage}
                                onLoginClick={creds => dispatch(loginUser(creds))} />
                            }
                            
                            {isAuthenticated &&
                                <Logout onLogoutClick={() => dispatch(logoutUser())} />
                            }
                        </div>
                    </div>
                    
                </div>
            </nav>
        );
    };
};

export default Navbar;