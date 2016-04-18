/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule server
 */

'use strict'

//Temporary
import { createStore } from 'redux';
import todoApp from '../shared/reducers';
let store = createStore(todoApp);
console.log(store);

// Initializes express and sets the routes
import routes from './routes';

