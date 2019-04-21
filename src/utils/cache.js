'use strict'

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const path = require('path')

module.exports = (function() {
  let pixels = {}
  return {
    get: () => {
      return pixels
    },
    init: async() => {
      const contents = await readFile(
        path.join(__dirname, './addresses.json'),
        'utf8'
      )
      pixels = JSON.parse(contents).addresses
      return pixels
    },
    set: (receiver, sender) => {
      pixels[receiver] = sender
    },
    addressExist: address => {
    console.log(pixels)
      return address in pixels
    }
  }
})()
