/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule app.component
 */

'use strict'

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { HTML } from '../../server/config';
import SiteNavbar from '../containers/siteNavbar.container';

class App extends Component {
    render () {
        return (
            <div>
                <Helmet {...HTML.head}/>
                <SiteNavbar auth={this.props.auth} dispatch={this.props.dispatch} {...this.props.location} />
                { this.props.children }
            </div>
        )
    }
};

function mapStateToProps (state) {
    console.log(state)
    const { auth } = state;
    
    return {
        auth
    }
}

export default connect(mapStateToProps)(App);