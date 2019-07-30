/**
 * Util module
 *
 * @author Andy Chung
 * @date  2018-11-05
 */
// Deps
let fs = require('fs')

// Convert normal string to base64 encoding string
let base64 = {
  encode: (str) => {
    return new Buffer(str).toString('base64')
  },
  decode: (str) => {
    return new Buffer(str, 'base64').toString()
  }
}

// ReadFile Sync Function
let readSync = (filePath) => fs.readFileSync(filePath).toString('utf-8')

// WriteFile Sync Function
let writeSync = (filePath, str) => fs.writeFileSync(filePath, str)

module.exports = {
  base64,
  readSync,
  writeSync
}