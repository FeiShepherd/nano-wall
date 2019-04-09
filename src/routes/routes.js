const {hello} = require('./middleware/hello.js')
const {create} = require('./middleware/pixel.js')

const middlewares = [
  {
    method: 'get',
    chain: ['/', hello],
  },
  {
    method: 'post',
    chain: ['/pixel', create],
  },
]

module.exports = middlewares
