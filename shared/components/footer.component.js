/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule footer.component
 */

'use strict';

import React from 'react';
import FilterLink from '../containers/filterLink.container';

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL'>
            All
        </FilterLink>
        {', '}
        <FilterLink filter='SHOW_ACTIVE'>
            Active
        </FilterLink>
        {', '}
        <FilterLink filter='SHOW_COMPLETED'>
            Completed
        </FilterLink>
    </p>
);

export default Footer;