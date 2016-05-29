/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule profile.page
 */

'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import UserBio from '../containers/userBio.container';

class ProfilePage extends Component {
    render() {
        return (
            <div>
                <Helmet title='Profile' />
                <UserBio />
            </div>
        );
    }
}


export default ProfilePage;