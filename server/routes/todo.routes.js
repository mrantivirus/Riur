/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.routes
 */

'use strict';

import { Router } from 'express';
const router = new Router();

import { todoController } from '../controllers';

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.postTodos);
router.post('/todos/:id/toggle', todoController.toggleTodo);

export default router;