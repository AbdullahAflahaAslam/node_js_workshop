// TODO: import path module from node
const Path = require('path')

// TODO: parse current file into path object
const currentPath = Path.parse(__filename)

// TODO: print the result to the console
console.log(currentPath)