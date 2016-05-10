/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule auth.model
 */

'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const authSchema = new Schema({
    email: { type: 'String', required: true },
    password: { type: 'String', required: true },
    dateRegistered: { type: 'Date', default: Date.now }
});

authSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        // Transform every document before returning the result
        const newUser = {
            email: ret.email,
            password: ret.password,
            dateRegistered: ret.dateRegistered
        };
        
        return newUser;
    }
});

authSchema.set('toObject', {
    transform: function (doc, ret, options) {
        // Transform every document before returning the result
        const newUser = {
            email: ret.email,
            password: ret.password,
            dateRegistered: ret.dateRegistered
        };
        
        return newUser;
    }
});

export default mongoose.model('Auth', authSchema);