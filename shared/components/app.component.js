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
import Helmet from 'react-helmet';
import { HTML } from '../../server/config';


class App extends Component {
    render () {
        return (
            <div>
                <Helmet {...HTML.head}/>
                <h1>Welcome to Riur!</h1>
                { this.props.children }
            </div>
        )
    }
};

export default App;