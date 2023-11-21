const path = require("path");

module.exports = {
    'appInitDelay': 1000,
    'browsers': ['chrome'],
    'concurrency': 1,
    'skipJsErrors': true,
    'src': [path.join(__dirname, 'src/**/*.ts')],
    "disableScreenshots": true,
};
