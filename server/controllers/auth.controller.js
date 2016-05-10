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

const authController = {
    login: (req, res) => {
        Auth.findOne({email:req.body.email}).exec((err, user) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }
            
            // No user account was found
            if (!user) {
                return res.status(403).send('That email address is not regiestered.');
            }
            
            // Check if the password is the same
            bcrypt.compare(req.body.password, user.password, (err, valid) => {
                if (!valid) {
                    return res.status(403).send('Your password is incorrect.');
                }
                
                res.cookie('token', jwt.sign(user), { secure: true, httpOnly: true, maxAge: 600000});
                return res.send(user);
            });
        });
    },
    
    logout: (req, res) => {
        res.clearCookie('token').status(200).send();
    },
    
    signup: (req, res) => {
        Auth.findOne({email:req.body.email}).exec((err, user) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }
            
            // There is an account with that email address
            if (user) {
                return res.status(401).send('This email address is already registered.');
            }
            
            bcrypt.hash(req.body.password, 15, (err, hash) => {
                if (err) {
                    return res.status(500).send('There was a problem creating your account.');
                }
                
                Auth.create({
                    email: req.body.email,
                    password: hash,
                    dateRegistered: req.body.date // if this is empty, then it uses the server time
                }).then((user) => {
                    res.cookie('token', jwt.sign(user), { secure: true, httpOnly: true, maxAge: 600000});                
                    return res.send(user);
                }).catch((err) => {
                    // TODO: Do better logging for db errors
                    return console.log(err);
                });
            });
        });
    }
};

export default authController;