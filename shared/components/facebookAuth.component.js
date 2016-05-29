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
        // Uncomment this line to perform auto-login with Facebook
        // FB.getLoginStatus(this.checkLoginState);
    };

    sendToServer(authResponse) {
        console.log('Welcome! Fetching your information... ');
        FB.api('/me', { fields: this.props.fields }, (user) => {
            console.log('Successful login for: ' + user.name);
            user.accessToken = authResponse.accessToken;
            this.props.dispatch(fbLoginUser(user));
            this.props.callback();
        });
    };

    checkLoginState(response) {
        console.log('Checking Facebook login status...');
        console.log(response);

        if (response.status === 'connected') { // 1. Logged into your app ('connected')
            this.sendToServer(response.authResponse);
        } else if (response.status === 'not_authorized') { // 2. Logged into Facebook, but not your app ('not_authorized')
            console.log('User is not authorized')
        } else { // 3. Not logged into Facebook and can't tell if they are logged into
                    //    your app or not.
            console.log('User needs to log into facebook')
        }
    };

    loginButtonClick() {
        FB.login(this.checkLoginState, { scope: this.props.scope })
    };

    render() {
        return (
            <div>
                <button className='btn btn-primary' onClick={this.loginButtonClick}>Login with Facebook</button>
            </div>
        )
    };
};

FacebookAuth.defaultProps = {
    scope: 'public_profile,email',
    fields: 'name,email,picture'
};

export default FacebookAuth;