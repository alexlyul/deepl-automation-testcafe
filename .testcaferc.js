const path = require("path");

module.exports = {
    'appInitDelay': 1000,
    'browsers': ['chrome'],
    'selectorTimeout': 10000,
    'concurrency': 1,
    'skipJsErrors': true,
    'src': [path.join(__dirname, 'src/**/*.ts')],
    "disableScreenshots": true,
};
