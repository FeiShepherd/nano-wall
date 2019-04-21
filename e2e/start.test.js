const assert = require('assert')
const assertRequest = require('assert-request')
const block = require('./sample-block.js')
const server = require('../src/server.js')
const request = assertRequest(server.start(3540))

describe('incoming block', () => {
  it('should call next on if match pixelhandler', () => {
    request('http://localhost:3540/block')
    /*const req = {
      body: {
        block
      }
    }
    const next = sinon.stub()
    const res = sinon.stub()

    middleware.checkPixels(req, res, next)

    assert(next.called, "couldn't find block")

    console.log('test')*/
  })
})
