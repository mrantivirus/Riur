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
import { HTML as htmlProps } from '../config/helmet.config';
import SiteNavbar from '../containers/siteNavbar.container';
import AsyncVendorScripts from './asyncVendorScripts.component';

class App extends Component {
    render() {
        return (
            <div>
                <AsyncVendorScripts language='en_US' />
                <Helmet {...htmlProps.head}/>
                <SiteNavbar auth={this.props.auth} dispatch={this.props.dispatch} {...this.props.location} />
                <div className='container-fluid'>
                    {React.cloneElement(this.props.children, { auth: this.props.auth }) }
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    const { auth } = state;

    return {
        auth
    }
}

export default connect(mapStateToProps)(App);