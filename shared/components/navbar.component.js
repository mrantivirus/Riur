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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import Login from './login.component';
import Logout from './logout.component';
import SignUp from './signup.component';
import FacebookAuth from './facebookAuth.component';
import { loginUser, logoutUser, registerUser } from '../actions';

import { Navbar as NavBar, Nav, NavItem, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
                                <LinkContainer key={index} to={val.url} active={this.props.router.isActive(val.url) }>
                                    <NavItem>{val.text}</NavItem>
                                </LinkContainer>
                            );
                        }) }
                    </Nav>
                    <NavBar.Form pullRight>
                        {!isAuthenticated &&
                            <div>
                                <Button bsStyle='primary' onClick={this.onLoginButtonClick}>
                                    Login
                                </Button>
                                <Button bsStyle='success' onClick={this.onSignUpButtonClick}>
                                    Sign Up
                                </Button>
                            </div>
                        }

                        {isAuthenticated &&
                            <Logout onLogoutClick={() => dispatch(logoutUser()) } />
                        }
                    </NavBar.Form>
                </NavBar.Collapse>

                <div>
                    <Modal show={this.state.openLoginModal} onHide={this.onLoginModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Login
                                errorMessage={errorMessage}
                                onLoginClick={creds => dispatch(loginUser(creds)) } />
                        </Modal.Body>
                        <Modal.Footer>
                            <FacebookAuth dispatch={dispatch} callback={this.onLoginModalClose} />
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.openSignUpModal} onHide={this.onSignUpModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Register</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SignUp dispatch={dispatch}
                                errorMessage={errorMessage}
                                onSignUpClick={creds => dispatch(registerUser(creds)) } />
                        </Modal.Body>
                        <Modal.Footer>
                            <FacebookAuth dispatch={dispatch} callback={this.onSignUpModalClose} />
                        </Modal.Footer>
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