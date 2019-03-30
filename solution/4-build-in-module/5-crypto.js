// TODO: import cryptographic module from node
const PATH = require('path')
const FS = require('fs')
const { createHash, createCipher, createDecipher } = require('crypto')

// TODO: Read note.txt and convert it's content to md5 and sha256 hash
const currentPath = PATH.resolve(__dirname)
const filename = 'note.txt'
const filePath = `${currentPath}/${filename}`
const notes = FS.existsSync(filePath) ? FS.readFileSync(filePath, 'utf8') : ''
const convertToHash = (hashType, text) => createHash(hashType).update(text).digest('hex')

console.log(
  convertToHash('md5', notes),
  convertToHash('sha256', notes),
)


// TODO: Create chipper class to handle encryption and description
class Chipper {
  constructor(algorithm) {
    this._algorithm = algorithm
  }
  encrypt(text, password) {
    const chipper = createCipher(this._algorithm, password)
    let crypted = chipper.update(text, 'utf8', 'hex')
    crypted += chipper.final('hex')
    return crypted
  }

  decrypt(text, password) {
    const chipper = createDecipher(this._algorithm, password)
    let decrypted = chipper.update(text, 'hex', 'utf8')
    decrypted += chipper.final('utf8')
    return decrypted
  }

}

// TODO: Try to encrypt and descrypt note.txt with password with 'aes-256-ctr' algorithm
const algorithm = 'aes-256-ctr'
const chipper = new Chipper(algorithm)
const encryptNote = chipper.encrypt(notes, 'supersecret')
const decryptNote = chipper.decrypt(encryptNote, 'supersecret')
console.log(
  `encrypted: ${encryptNote}`,
  `decrypted: ${decryptNote}`,
)