/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule posts.component
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

export default class Posts extends Component {
    render() {
        return (
            <ul className='media-list'>
                {this.props.posts.map((post, i) => {
                    return (
                        <li className='media' key={i}>
                            <div className='media-left media-middle'>
                                <a href={post.get('url')}>
                                    <img className='media-object' style={{width:'50px',height:'50px'}} src={
                                        post.get('thumbnail') === '' || post.get('thumbnail') === 'self' || post.get('thumbnail') === 'default' ? '/images/reddit-logo.png' : post.get('thumbnail')
                                    } />
                                </a>
                            </div>
                            <div className='media-body'>
                                <h4 className='media-heading'>{post.get('title')}</h4>
                                <div>
                                    <p>{post.get('selftext').substring(0,255)}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.instanceOf(List).isRequired
}