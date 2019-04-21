'use strict'

const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)

let pixels = {}

const initFromFile = async (file = './addresses.json') => {
  try {
    const contents = await readFile(file, 'utf8')
    console.log(contents)
    pixels = JSON.parse(contents)
    return 1
  } catch (err) {
    throw err
  }
}

const setPixel = (address, sender) => {
  pixels[address] = sender
}

const addressExist = address => {
  return address in pixels
}

const getPixels = () => {
  return pixels
}

module.exports = {
  initFromFile,
  addressExist,
  setPixel,
  getPixels,
}
