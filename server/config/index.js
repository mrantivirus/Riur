/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule config
 */

'use strict';

const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
};

export const ENV = environment[process.env.NODE_ENV || 'development'];
export const PORT = process.env.PORT || 4000;
export const DATABASE_URL = process.env.DB_URL || 'mongodb://localhost/riur';
export const HOST = process.env.HOST || 'localhost';
export const SECRET = process.env.SECRET || '75caf772-a5af-4b1a-9104-ffb87773ddc7';