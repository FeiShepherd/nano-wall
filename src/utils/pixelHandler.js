'use strict'

const fs = require('fs')
const {promisify} = require('util')
const readFile = promisify(fs.readFile)
const path = require('path')

let pixels = {}

const initFromFile = async (file = path.join(__dirname, './addresses.json')) => {
  try {
    const contents = await readFile(file, 'utf8')
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
  getPixels
}
