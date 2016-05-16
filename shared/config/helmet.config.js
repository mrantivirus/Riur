/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule helmet.config
 */

'use strict';

export const HTML = {
    head: {
        defaultTitle: 'Riur Example',
        titleTemplate: 'Riur | %s',
        description: 'A boilerplate to jumpstart your React lifestyle.',
        meta: [
            { charset: 'utf-8' },
            { name: 'description', content: 'A boilerplate to jumpstart your React lifestyle.' },
            { property: 'og:site_name', content: 'Riur Example' },
            { property: 'og:image', content: 'https://facebook.github.io/react/img/logo_og.png' },
            { property: 'og:locale', content: 'en_US' },
            { property: 'og:title', content: 'Riur Example' },
            { property: 'og:description', content: 'A boilerplate to jumpstart your React lifestyle.' },
            { property: 'og:card', content: 'summary' },
            { property: 'og:site_name', content: 'Riur' },
            { property: 'og:creator', content: '@mrantivirus' },
            { property: 'og:image:width', content: '200' },
            { property: 'og:image:height', content: '200' },
        ],
        link: [
            { rel: 'stylesheet', type: 'text/css', href:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' }
        ],
        script: [
            { src:'https://code.jquery.com/jquery-1.12.3.min.js', type:'text/javascript'},
            { src:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js', type:'text/javascript'}
        ]
    }
};