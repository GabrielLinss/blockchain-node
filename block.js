const crypto = require('crypto-js')
const chain = require('./chain')

module.exports.generateHash = function ({index, prevHash, timestamp, data}) {
    return crypto.SHA256(data + index + prevHash + timestamp).toString()
}

module.exports.create = (data) => {
    const lastBlock = chain.last()
    
    const newblock = {
      index : lastBlock.index + 1,
      prevHash : lastBlock.hash,
      timestamp : new Date().getTime(),
      data : data,
    }

    newblock.hash = this.generateHash(newblock)

    return newblock
}

module.exports.validateBlock = (newBlock, lastBlock = chain.last()) => {
    let blockIsValid = false
  
    if (newBlock.index == lastBlock.index+1) {
      blockIsValid = true
    } else if (newBlock.prevHash == lastBlock.hash) {
      blockIsValid = true
    } else if (newBlock.hash == this.generateHash(newBlock)) {
      blockIsValid = true
    }
  
    return blockIsValid
}
