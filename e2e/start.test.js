const request = require('supertest')
const block = require('./sample-block.js')
const server = require('../src/server.js')
const Readable = require('stream').Readable

process.env.NODE_ENV = 'development'
process.env.RAI_NODE_HOST = 'http://[::1]:7076'

describe('lel', () => {
  it('lel2', async () => {
    const app = await server.start(5000)
    const req = request(app)
      .post('/block')
      .set('content-type', 'application/octet-stream')

    const blockStream = new Readable()
    blockStream.push(JSON.stringify(block))
    blockStream.push(null)
    blockStream.on('end', () => req.end())
    blockStream.pipe(
      req,
      { end: false }
    )
  })
})
/*
describe('incoming block', () => {
  it('should call next on if match pixelhandler', () => {
    const stream = Buffer.from(JSON.stringify(block), 'utf8')
    console.log(stream)
    return request.post('/block', stream).type('application/json').body()
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
