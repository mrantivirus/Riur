/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule client
 */

'use strict'

import React from 'react';
import { render } from 'react-dom';


if (process.env.NODE_ENV !== 'production') {
    window.React = React; // Enable debugger
}
