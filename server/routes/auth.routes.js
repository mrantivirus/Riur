/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule auth.routes
 */

'use strict';

import { Router } from 'express';
const router = new Router();

import { authController } from '../controllers';

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/signup', authController.signup);

export default router;