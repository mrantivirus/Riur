/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule picker.component
 */

'use strict';

import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
    render() {
        return (
            <ul className='media-list'>
                {this.props.posts.map((post, i) => {
                    return (
                        <li className='media' key={i}>
                            <div className='media-left media-middle'>
                                <a href={post.url}>
                                    <img className='media-object' style={{width:'50px',height:'50px'}} src={
                                        post.thumbnail === '' || post.thumbnail === 'self' ? '/images/reddit-logo.png' : post.thumbnail
                                    } />
                                </a>
                            </div>
                            <div className='media-body'>
                                <h4 className='media-heading'>{post.title}</h4>
                                <div>
                                    <p>{post.selftext.substring(0,255)}</p>
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
    posts: PropTypes.array.isRequired
}