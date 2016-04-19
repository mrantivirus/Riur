/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule app
 */

'use strict'

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Helmet from 'react-helmet';
import { HTML } from '../server/config';

export default class App extends Component {
    
    render () {
        return (
            <div>
                <Helmet {...HTML.head}/>
                Welcome to Riur!
            </div>
        );
    }
};

if (module.hot) {
    module.hot.accept();
}