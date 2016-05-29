/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule siteNavbar.container
 */

'use strict';

import React, { Component } from 'react'
import Navbar from '../components/navbar.component';

class SiteNavbar extends Component {
    constructor(props) {
        super(props);
        
        this.brand = 'Riur';
        this.links = [
            {
                url: '/todo',
                text: 'Todos'
            },
            {
                url: '/reddit',
                text: 'Reddit API'
            },
            {
                url: '/profile',
                text: 'Profile',
                needsAuth: true
            }
        ];
    }
    
    render () {
        return (
            <Navbar brand={this.brand} links={this.links} {...this.props}/>
        );
    }
};

export default SiteNavbar;