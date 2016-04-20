/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule html.container
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export default class Layout extends Component {
    static propTypes = {
        assets: PropTypes.object,
        content: PropTypes.string,
        store: PropTypes.object,
        isProd: PropTypes.bool
    }
    
    render () {
        const { assets, content, store, isProd } = this.props;
        const head = Helmet.rewind();
        const attrs = head.htmlAttributes.toComponent();
        
        return (
            <html {...attrs}>
                <head>
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    
                    <link rel='shortcut icon' href='/favicon.ico' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                </head>
                <body>
                    <div id='content' dangerouslySetInnerHTML={{__html: content}} />
                    <script dangerouslySetInnerHTML={{__html: `window.__app_data=${serialize(store.getState())}; window.__isProduction=${isProd}`}} charSet='UTF-8' />
                    <script src={assets.javascript.main} charSet='UTF-8' />
                </body>
            </html>
        );
    }
};