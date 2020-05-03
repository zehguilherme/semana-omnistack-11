const crypto = require('crypto')

//Gera 4 bites de caracteres hexadecimais
module.exports = function generateUniqueId () {
  return crypto.randomBytes(4).toString('HEX')
}
