'use strict'

// Enable runtime transpilation of ES6 in Node
let fs = require('fs');

let babelrc = fs.readFileSync('./.babelrc');
let config;

try {
    config = JSON.parse(babelrc);
} catch (err) {
    console.error('==>  ERROR: Error parsing your .babelrc.');
    console.error(err);
}

require('babel-register')(config);
//require('babel-polyfill');
// END

require('./server/server');