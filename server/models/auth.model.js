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
    email: { type: 'String', required: false }, // False for social logins
    password: { type: 'String', required: false }, // False for social logins
    dateRegistered: { type: 'Date', default: Date.now },
    facebook: {
        userID: { type: 'String' },
        accessToken: { type: 'String' },
        name: { type: 'String' },
        pictureURL: { type: 'String' }
    }
});

authSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        // Transform every document before returning the result
        let newUser = {
            email: ret.email,
            dateRegistered: ret.dateRegistered
        };

        // Set to a new variable instead of returning so we can merge other social media
        newUser = mergeUserWithFacebook(newUser, ret);

        return newUser;
    }
});

authSchema.set('toObject', {
    transform: function (doc, ret, options) {
        // Transform every document before returning the result
        let newUser = {
            email: ret.email,
            dateRegistered: ret.dateRegistered
        };

        newUser = mergeUserWithFacebook(newUser, ret);

        return newUser;
    }
});

const mergeUserWithFacebook = (user, ret) => {
    if (typeof ret.facebook === 'undefined') {
        return user;
    }

    // Create a new merged object
    return Object.assign({}, user, {
        facebook: {
            id: ret.facebook.userID,
            accessToken: ret.facebook.accessToken,
            name: ret.facebook.name,
            photoURL: ret.facebook.pictureURL
        }
    });
};

export default mongoose.model('Auth', authSchema);