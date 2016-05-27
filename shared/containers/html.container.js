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
import { HTML as htmlProps } from '../config/helmet.config';

export default class Layout extends Component {
    static propTypes = {
        content: PropTypes.string,
        store: PropTypes.object,
        isProd: PropTypes.bool
    }

    render() {
        const { content, store, isProd } = this.props;
        const head = Helmet.rewind();
        const attrs = head.htmlAttributes.toComponent();

        return (
            <html {...attrs}>
                <head>
                    {head.base.toComponent() }
                    {head.title.toComponent() }
                    {head.meta.toComponent() }
                    {head.link.toComponent() }

                    <link rel='shortcut icon' href='/favicon.ico' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                </head>
                <body>
                    <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
                    <script dangerouslySetInnerHTML={{ __html: `window.__app_data=${serialize(store.getState())}; window.__isProduction=${isProd}` }} />
                    {htmlProps.head.scripts.map((val, i) => {
                        return <script src={val.src} type={val.type} key={i} />
                    }) }
                </body>
            </html>
        );
    }
};