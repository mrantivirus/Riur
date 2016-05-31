/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule asyncVendorScripts.component
 */

'use strict'

import React, { Component } from 'react';

export default class AsyncVendorScripts extends Component {
    constructor(props) {
        super(props);

        this.loadFacebook = this.loadFacebook.bind(this);
    }

    componentDidMount() {
        this.loadFacebook();
    }

    loadFacebook() {
        window.fbAsyncInit = () => {
            FB.init({
                appId: this.props.appId,
                cookie: this.props.facebook.cookie,  // disable cookies to keep our cookie flow consistent
                xfbml: this.props.facebook.xfbml,  // parse social plugins on this page
                version: this.props.facebook.version // use graph api version 2.6
            });
        };

        const self = this;
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/' + self.props.language + '/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    }

    render() {
        return null;
    }
};

AsyncVendorScripts.defaultProps = {
    language: 'en_US',
    facebook: {
        cookie: false,
        version: 'v2.6',
        xfbml: false
    }
};