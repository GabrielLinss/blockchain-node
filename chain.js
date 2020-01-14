const block = require('./block')

const Chain = (function () {
    let instance

    const firstBlock = {
        index: 0,
        prevHash: 0,
        timestamp: 0,
        data: 'Blockchain is borning',
        hash: block.generateHash({ index: 0, prevHash: 0, timestamp: 0, data: 'Blockchain is borning' }),
    }

    const chain = [firstBlock]

    function validateChain (chain) {
        let validChain = true
        if (JSON.stringify(chain[0]) !== JSON.stringify(origin)) {
            validChain = false
            return validChain
        }

        const temp = [chain[0]]

        for (let i=1; i < chain.length; i++) {
            if (block.validateBlock(chain[i], temp[i - 1])) {
                temp.push(chain[i])
            } else {
                validChain = false
                return validChain
            }
        }

        return validChain
    }

    function get () {
        return chain
    }

    function last () {
        return chain.slice().pop()
    }

    function update (newBlock) {
        block.validateBlock(newBlock) ? chain.push(newBlock) : console.log('invalid block recived')
    }

    function replace (newChain) {
        if (validateChain(newChain) && newChain.length > chain.length) {
            chain.splice(0, chain.length)
            chain.push(...newChain)
        } else {
            console.log('invalid chain recived')
        }
    }

    function create () {
        return { get, last, update, replace }
    }

    return {
        init () {
            if (!instance) {
                instance = create()
            }

            return instance
        }
    }
})()

module.exports = Chain.init()
