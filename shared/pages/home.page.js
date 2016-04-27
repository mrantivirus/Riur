/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule home.page
 */

'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Helmet title='Dashboard' />
                <h1>Welcome to Riur!</h1>
            </div>
        );
    }
}

export default HomePage;