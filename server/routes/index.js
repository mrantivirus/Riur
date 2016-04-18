/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule routes
 */

'use strict';

import express from 'express';
import todos from './todo.routes';

let app = express();
app.use('/todos', todos);

app.listen(4000, () => {
    console.log('Riur is listening on port 4000');
});