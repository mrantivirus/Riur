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
import SignUp from './signup.component';
import FacebookAuth from './facebookAuth.component';
import { loginUser, logoutUser, registerUser } from '../actions';
import Modal from 'react-modal';

import { Navbar as NavBar, Nav, NavItem } from 'react-bootstrap';

const style = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
}

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openLoginModal: false,
            openSignUpModal: false
        };

        this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
        this.onSignUpButtonClick = this.onSignUpButtonClick.bind(this);
        this.onLoginModalClose = this.onLoginModalClose.bind(this);
        this.onSignUpModalClose = this.onSignUpModalClose.bind(this);
    }

    onLoginButtonClick() {
        let myState = this.state;
        myState.openLoginModal = true;
        this.setState(myState)
    }
    onLoginModalClose() {
        let myState = this.state;
        myState.openLoginModal = false;
        this.setState(myState)
    }

    onSignUpButtonClick() {
        let myState = this.state;
        myState.openSignUpModal = true;
        this.setState(myState)
    }
    onSignUpModalClose() {
        let myState = this.state;
        myState.openSignUpModal = false;
        this.setState(myState)
    }

    render() {
        const { dispatch, auth } = this.props;
        const { isAuthenticated, errorMessage } = auth;

        return (
            <NavBar fluid>
                <NavBar.Header>
                    <NavBar.Brand>
                        <Link className='navbar-brand' to='/'>{this.props.brand}</Link>
                    </NavBar.Brand>
                    <NavBar.Toggle />
                </NavBar.Header>
                <NavBar.Collapse>
                    <Nav>
                        {this.props.links.filter((link) => { if (link.needsAuth) { return isAuthenticated } else { return true } }).map((val, index) => {
                            return (
                                <li key={index} className={this.props.router.isActive(val.url) ? "active" : ""} >
                                    <Link to={val.url}>{val.text}</Link>
                                </li>
                            );
                        }) }
                    </Nav>
                    <NavBar.Form pullRight>
                        {!isAuthenticated &&
                            <div>
                                <button type='button' className='btn btn-primary' onClick={this.onLoginButtonClick}>
                                    Login
                                </button>
                                <button type='button' className='btn btn-success'  onClick={this.onSignUpButtonClick}>
                                    Sign Up
                                </button>
                            </div>
                        }

                        {isAuthenticated &&
                            <Logout onLogoutClick={() => dispatch(logoutUser()) } />
                        }
                    </NavBar.Form>
                </NavBar.Collapse>

                <div>
                    <Modal style={style} className='Modal__Bootstrap modal-dialog' isOpen={this.state.openLoginModal} onRequestClose={this.onLoginModalClose}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' onClick={this.onLoginModalClose}>
                                    <span aria-hidden="true">&times; </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <h4 className='modal-title'>Login</h4>
                            </div>

                            <div className='modal-body'>
                                <Login
                                    errorMessage={errorMessage}
                                    onLoginClick={creds => dispatch(loginUser(creds)) } />
                            </div>

                            <div className='modal-footer'>
                                <FacebookAuth dispatch={dispatch} callback={this.onLoginModalClose} />
                            </div>
                        </div>
                    </Modal>
                    <Modal style={style} className='Modal__Bootstrap modal-dialog' isOpen={this.state.openSignUpModal} onRequestClose={this.onSignUpModalClose}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <button type='button' className='close' onClick={this.onSignUpModalClose}>
                                    <span aria-hidden="true">&times; </span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <h4 className='modal-title'>Login</h4>
                            </div>

                            <div className='modal-body'>
                                <SignUp
                                    errorMessage={errorMessage}
                                    onSignUpClick={creds => dispatch(registerUser(creds)) } />
                            </div>

                            <div className='modal-footer'>
                                <FacebookAuth dispatch={dispatch} callback={this.onLoginModalClose} />
                            </div>
                        </div>
                    </Modal>
                </div>
            </NavBar>
        );
    };
};

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

// withRouter adds the 'router' object to props
export default withRouter(Navbar);