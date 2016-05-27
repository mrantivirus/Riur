/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule facebookAuth.component
 */

'use strict'

import React, { Component } from 'react';
import { fbLoginUser } from '../actions/facebook.actions';

class FacebookAuth extends Component {
    constructor(props) {
        super(props)

        this.loginButtonClick = this.loginButtonClick.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
    }

    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.init({
                appId: 285046788500317,//this.props.appId,
                cookie: this.props.cookie,  // disable cookies to keep our cookie flow consistent
                xfbml: this.props.xfbml,  // parse social plugins on this page
                version: 'v2.5' // use graph api version 2.5
            });

            // Now that we've initialized the JavaScript SDK, we call 
            // FB.getLoginStatus().  This function gets the state of the
            // person visiting this page and can return one of three states to
            // the callback you provide.  They can be:
            //
            // 1. Logged into your app ('connected')
            // 2. Logged into Facebook, but not your app ('not_authorized')
            // 3. Not logged into Facebook and can't tell if they are logged into
            //    your app or not.
            //
            // These three cases are handled in the callback function.
            FB.getLoginStatus(this.checkLoginState);
        };
    };

    sendToServer(authResponse) {
        console.log('Welcome! Fetching your information... ');
        FB.api('/me', { fields: this.props.fields }, (user) => {
            console.log('Successful login for: ' + user.name);
            user.accessToken = authResponse.accessToken;
            console.log(user)
            this.props.dispatch(fbLoginUser(user));
        });
    };

    checkLoginState(response) {
        console.log('Checking Facebook login status...');
        console.log(response);

        if (response.status === 'connected') {
            console.log('Success!') // Save the data in auth.Response
            this.sendToServer(response.authResponse);
        } else if (response.status === 'not_authorized') {
            console.log('User is not authorized')
        } else {
            console.log('User needs to log into facebook')
        }
    };

    loginButtonClick() {
        FB.login(this.checkLoginState, { scope: this.props.scope })
    };

    render() {
        return <button className='btn btn-primary' onClick={this.loginButtonClick}>Login with Facebook</button>
    };
};

FacebookAuth.defaultProps = {
    scope: 'public_profile,email',
    cookie: false,
    fields: 'name,email,picture',
    version: '2.5',
    xfbml: false,
    language: 'en_US'
};

export default FacebookAuth;