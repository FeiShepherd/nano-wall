'use strict'

const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const path = require('path')

module.exports = (function() {
  let pixels = {}
  return {
    get: () => {
      return pixels
    },
    init: async () => {
      const contents = await readFile(path.join(__dirname, './addresses.json'))
      pixels = JSON.parse(contents).addresses
      return pixels
    },
    set: (receiver, sender) => {
      pixels[receiver] = sender
    },
    addressExist: address => {
      return address in pixels
    },
    backUp: async () => {
      await writeFile(
        path.join(__dirname, './addresses.json'),
        JSON.stringify({
          addresses: pixels,
        }),
        'utf8',
      )
    },
  }
})()
