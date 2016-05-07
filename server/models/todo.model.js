/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule todo.model
 */

'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    isCompleted: { type: 'Boolean', default: true, required: true },
    text: { type: 'String', required: true }
});

export default mongoose.model('Todo', todoSchema);