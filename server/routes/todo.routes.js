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

router.get('/todos', function (req, res) {
    res.send({text: 'first!', isCompleted: false});
});

export default router;