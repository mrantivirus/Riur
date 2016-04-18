/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'

var gulp = require('gulp');
var del = require('del');

var paths = {
    buildPath: './dist'
};

gulp.task('test', function () {
    return console.log('TODO: Write unit tests!')
});

gulp.task('clean', function () {
   return del([paths.buildPath]) 
});

gulp.task('default', ['clean']);