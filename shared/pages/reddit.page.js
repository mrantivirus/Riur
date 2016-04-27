/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reddit.page
 */

'use strict';

import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Reddit from '../containers/reddit.container';

class RedditPage extends Component {
    render() {
        return (
            <div>
                <Helmet title='Reddit-Redux' />
                <h1>This is Redux's Reddit API Example</h1>
                <Reddit />
            </div>
        );
    }
}

export default RedditPage;