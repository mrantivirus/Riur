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

import { Auth } from '../models';
import jwt from '../utils/jwt';

const authController = {
    login: (req, res) => {
        Auth.find({email:req.body.email}).exec((err, user) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }
            
            if (!user) {
                return res.status(401).send('That email address is not regiestered.');
            }
            
            // TODO: Check password
            
            res.cookie('token', jwt.sign(user), { secure: true, httpOnly: true, maxAge: 600000});
            return res.send(user);
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
            
            if (user) {
                return res.status(401).send('This email address is already registered.');
            }
            
            Auth.create({
                email: req.body.email,
                passwork: req.body.password,
                dateRegistered: req.body.date
            }).then((user) => {
                return res.send(user);
            }).catch((err) => {
                // TODO: Do better logging for db errors
                return console.log(err);
            });
            
            Auth.create((err) => {
                if (err) {
                    // TODO: Do better logging for db errors
                    console.log(err);
                    return res.status(500).send(err);
                }
                
                return res.send(todo);
            });
        });
    }
};

export default authController;