// TODO: import OS module
const OS = require('os')

// Get total current machine memory
const totalMemory = OS.totalmem()

// Get total current machine free memory
const freeMemory = OS.freemem()

// Print the result
console.log(`
-------------------------------------
|  Your total memory: ${totalMemory}    |
|  Your free memory:  ${freeMemory}       |
-------------------------------------
`)