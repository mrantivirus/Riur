/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reddit.container
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, fetchPosts, invalidateSubreddit } from '../actions';
import Picker from '../components/picker.component';
import Posts from '../components/posts.component';

class Reddit extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    
    static fetchData(store) {
        const { selectedSubreddit } = store.getState();
        return store.dispatch(fetchPosts(selectedSubreddit));
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(selectSubreddit(nextSubreddit));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        return (
            <div>
                <Picker value={selectedSubreddit}
                    onChange={this.handleChange}
                    options={['reactjs', 'frontend', 'earthporn']} />
                <p>
                    {lastUpdated &&
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString() }.
                            {' '}
                        </span>
                    }
                    {!isFetching &&
                        <a href='#'
                            onClick={this.handleRefreshClick}>
                            Refresh
                        </a>
                    }
                </p>
                {isFetching && posts.length === 0 &&
                    <h2>Loading...</h2>
                }
                {!isFetching && posts.length === 0 &&
                    <h2>Empty.</h2>
                }
                {posts.length > 0 &&
                    <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <Posts posts={posts} />
                    </div>
                }
            </div>
        );
    }
};

Reddit.propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(Reddit);