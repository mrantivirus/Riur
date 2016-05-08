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
        Todo.find().exec((err, todos) => {
            if (err) {
                // TODO: Do better logging for db errors
                return console.log(err);
            }
            
            return res.send(todos);
        });
    },
    
    postTodos: (req, res) => {
        Todo.create({
            text: req.body.text
        }).then((todo) => {
            console.log('should be my todo',todo);
            return res.send(todo);
        })
        .catch((err) => {
            // TODO: Do better logging for db errors
            return console.log('this is an err',err);
        });
    }
};

export default todoController;