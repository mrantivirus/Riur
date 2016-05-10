/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Fetch
 */

'use strict';

import fetch from 'isomorphic-fetch';

export default {
    get: (url, options) => {
        const fetchOptions = {
            method: 'GET',
            credentials: 'same-origin'
        }
        
        return fetch(url, options || fetchOptions)
    },
    
    post: (url, body, options) => {
        const fetchOptions = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }
        
        return fetch(url, options || fetchOptions)
    },
};