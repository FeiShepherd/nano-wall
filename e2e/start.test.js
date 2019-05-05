const request = require('supertest')
const block = require('./sample-block.js')
const server = require('../src/server.js')
const Readable = require('stream').Readable
const cache = require('../src/utils/cache.js')
const assert = require('assert')

process.env.NODE_ENV = 'development'
process.env.RAI_NODE_HOST = 'http://[::1]:7076'

describe('Test post /block', () => {
  it('Should accept/validate block then update cache', async () => {
    const app = await server.start(5000)
    const sender = block.account
    const receiver = JSON.parse(block.block).link_as_account
    const beforeSubmit = cache.get()[receiver]
    const req = request(app)
      .post('/block')
      .set('content-type', 'application/octet-stream')

    const blockStream = new Readable()
    blockStream.push(JSON.stringify(block))
    blockStream.push(null)
    blockStream.pipe(
      req,
      { end: false }
    )
    blockStream.on('end', () => {
      req.end(() => {
        assert.equal(cache.get()[receiver], sender)
      })
    })
  })
})
