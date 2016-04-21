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
export const DATABASE_URL = 'mongodb://localhost/riur';
export const HOST = process.env.HOST || 'localhost';
export const HTML = {
    head: {
        title: 'Riur Example',
        description: 'A boilerplate to jumpstart your React lifestyle.',
        meta: [
            { charset: 'utf-8' },
            { name: 'description', content: 'A boilerplate to jumpstart your React lifestyle.' },
            { property: 'og:site_name', content: 'Riur Example' },
            { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:title', content: 'Riur Example' },
            { property: 'og:description', content: 'A boilerplate to jumpstart your React lifestyle.' },
            { property: 'og:card', content: 'summary' },
            { property: 'og:site', content: '@mrantivirus' },
            { property: 'og:creator', content: '@mrantivirus' },
            { property: 'og:image:width', content: '200' },
            { property: 'og:image:height', content: '200' },
        ],
        link: [
            { rel: 'stylesheet', type: 'text/css', href:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' }
        ]
    }
};