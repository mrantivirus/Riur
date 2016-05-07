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
    static fetchData (store, params) {
        // Return a promise to be consumed by the server.
        return Reddit.fetchData(store);
    }
    
    render() {
        return (
            <div>
                <Helmet title='Reddit-Redux' />
                <h1>Redux's Reddit API Example</h1>
                <Reddit />
            </div>
        );
    }
}

export default RedditPage;