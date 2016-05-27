/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule auth.controller
 */

'use strict';

import bcrypt from 'bcrypt';
import { Auth } from '../models';
import jwt from '../utils/jwt';

const ONEDAY_MILLISECONDS = 86400000;

const authController = {
    login: (req, res) => {
        Auth.findOne({ email: req.body.email.toLowerCase() }).exec((err, user) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }

            // No user account was found
            if (!user) {
                return res.status(401).send({ message: 'That email address is not regiestered.' });
            }

            // Check if the password is the same
            bcrypt.compare(req.body.password, user.password, (err, valid) => {
                if (!valid) {
                    return res.status(401).send({ message: 'Your password is incorrect.' });
                }

                res.cookie('token', jwt.sign({ user: user }), { signed: true, httpOnly: true, maxAge: ONEDAY_MILLISECONDS });
                return res.send(user);
            });
        });
    },

    logout: (req, res) => {
        res.clearCookie('token').status(200).send();
    },

    signup: (req, res) => {
        Auth.findOne({ email: req.body.email.toLowerCase() }).exec((err, user) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }

            // There is an account with that email address
            if (user) {
                return res.status(401).send({ message: 'This email address is already registered.' });
            }

            bcrypt.hash(req.body.password, 15, (err, hash) => {
                if (err) {
                    return res.status(500).send({ message: 'There was a problem creating your account.' });
                }

                Auth.create({
                    email: req.body.email.toLowerCase(),
                    password: hash,
                    dateRegistered: req.body.date // if this is empty, then it uses the server time
                }).then((user) => {
                    res.cookie('token', jwt.sign({ user: user }), { signed: true, httpOnly: true, maxAge: ONEDAY_MILLISECONDS });
                    return res.send(user);
                }).catch((err) => {
                    // TODO: Do better logging for db errors
                    return console.log(err);
                });
            });
        });
    },

    fbLogin: (req, res) => {
        Auth.findOne({ 'facebook.userID': req.body.id }).exec((err, user) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }

            console.log('facebook.login', req.body);

            // There is a Facebook account already, so success!
            if (user) {
                res.cookie('token', jwt.sign({ user: user }), { signed: true, httpOnly: true, maxAge: ONEDAY_MILLISECONDS });
                return res.send(user);
            }

            // Create facebook model data to save later
            const fb = {
                userID: req.body.id,
                accessToken: req.body.accessToken,
                name: req.body.name,
                pictureURL: req.body.picture.data.url
            };

            // Check to see if the email is already registered
            Auth.findOne({ email: req.body.email.toLowerCase() }).exec((innerErr, innerUser) => {
                if (innerErr) {
                    // TODO: Do better logging for db errors
                    return console.log(innerErr);
                }

                if (innerUser) { // User is already signed up! Let's merge.
                    innerUser.facebook = fb;

                    innerUser.save()
                        .then((theUser) => {
                            res.cookie('token', jwt.sign({ user: theUser }), { signed: true, httpOnly: true, maxAge: ONEDAY_MILLISECONDS });
                            return res.send(theUser);
                        })
                        .catch((err) => {
                            // TODO: Do better logging for db errors
                            return console.log(err);
                        });
                }
            });

            Auth.create({
                email: req.body.email.toLowerCase(),
                facebook: fb,
                dateRegistered: req.body.date // if this is empty, then it uses the server time
            }).then((newUser) => {
                res.cookie('token', jwt.sign({ user: newUser }), { signed: true, httpOnly: true, maxAge: ONEDAY_MILLISECONDS });
                return res.send(newUser);
            }).catch((err) => {
                // TODO: Do better logging for db errors
                return console.log(err);
            });
        });
    },
};

export default authController;