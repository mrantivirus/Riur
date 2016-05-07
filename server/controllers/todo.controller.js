/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.controller
 */

'use strict';

import { Todo } from '../models';

const todoController = {
    getTodos: (req, res) => {
        Todo.find().lean().exec((err, todos) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }
            
            res.send(todos);
        });
    },
    
    postTodos: (req, res) => {
        Todo.create({
            id: req.body.id,
            isCompleted: req.body.isCompleted,
            text: req.body.text
        }).exec((err, todo) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }
            
            res.status(200).end();
        });
    }
};

export default todoController;