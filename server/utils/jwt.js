/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule JWT
 */

'use strict';

import webToken from 'jsonwebtoken';
import { SECRET } from '../config';

export default {
    // Creates an encoded token.
    sign: (jsonData, timeToExpire) => {
        return webToken.sign(jsonData, SECRET, {
            expiresIn: timeToExpire ? timeToExpire : '1d',
            algorithm: 'HS512'
        });
    },

    // Verifies a sent token.
    verify: (token, callback) => {
        // Verify is ASynchronous, so handle code in callback.
        webToken.verify(token, SECRET, callback);
    },

    // Decodes a token without verification, try to avoid using.
    decode: (token) => {
        return webToken.decode(token, SECRET);
    },
    
    // Middleware used to protect routes.
    middleware: (request, response, next) => {
        // Grab the token
        let token = request.body.token || request.query.token || request.headers['authorization'] || request.token;
        if (token) {
            // Verify the token
            webToken.verify(token, SECRET, function(err, contents) {
                if (err) {
                    return response.status(403).json({success: false, message: 'Failed to authenticate token.'});
                }
                
                // Everything is good, so store the contents and pass along
                request.tokenContents = contents;
                next();
            });
        } else {
            // No token was received, THEY SHALL NOT PASS!
            return response.status(403).json({success: false, message: 'No token was provided.'});
        }
    },
    
    // Extracts a token from res.cookies or res.signedCookies
    extractTokenFromCookie: (request, response, next) => {
        try {
            // Get the cookie, then pull the token            
            request.token = request.signedCookies.token || request.cookies.token;            
        } catch (err) {
            // Probably trying to access something that was undefined
            console.log(err);
        }
        
        next();
    }
};