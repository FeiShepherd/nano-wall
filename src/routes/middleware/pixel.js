'use strict'

//const cacheHandler = require('../utils/pixelHandler.js')

const getPixel = (req, res, next) => {
  res.status(200).json('pixel')
}

module.exports = {
  getPixel,
}
