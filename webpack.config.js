const path = require('path');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        filename: 'scripts/main.js',
        path: path.resolve(__dirname, './dist'),
    }
}