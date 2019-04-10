const {getPixel} = require('./middleware/pixel.js')

const middlewares = [
  {
    method: 'get',
    chain: ['/pixel', getPixel],
  },
]

module.exports = middlewares
