/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule userBio.container
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromJS, Map } from 'immutable';

class UserBio extends Component {
    constructor(props) {
        super(props);
    }

    static fetchData(store) {
        // Not needed, but you can dispatch an action for more details
        const { auth } = store.getState();
        return Promise.resolve(auth.user);
    }

    render() {
        const { user } = this.props;
        
        const name = user.get('facebook') != null ? user.get('facebook').get('name') : user.get('email');
        const photo = user.get('facebook') != null ? user.get('facebook').get('photoURL') : '/images/reddit-logo.png';
        
        return (
            <div className='row'>
                <img src={photo} className='img-responsive img-circle center-block' alt='Profile image' />
                <h4 className='text-center'>{'Welcome, ' + name}</h4>
            </div>
        );
    }
};

UserBio.propTypes = {
    user: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: fromJS(state.auth.user)
    };
}

export default connect(mapStateToProps)(UserBio);