'use strict'

let pixelHandler = require('../../utils/cache.js')

const getPixel = (req, res, next) => {
  const pixels = pixelHandler.get()
  res.status(200).json(pixels)
}

module.exports = {
  getPixel,
}
