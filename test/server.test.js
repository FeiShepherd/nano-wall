const assert = require('assert')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Server', () => {
  let express, api, expressObj, routes, bodyParser, pixelHandler
  beforeEach(() => {
    expressObj = {
      get: sinon.stub(),
      listen: sinon.stub(),
      use: sinon.stub()
    }
    pixelHandler = {
      init: sinon.stub()
    }
    bodyParser = sinon.stub()
    routes = sinon.stub()
    express = sinon.stub().returns(expressObj)
    api = proxyquire('../src/server.js', {
      express: express,
      './routes/index.js': routes,
      'body-parser': bodyParser,
      './utils/cache.js': pixelHandler
    })
  })
  describe('#start()', async () => {
    it('should start express', async () => {
      await api.start()
      assert(express.called)
    })
    it('should listen', async () => {
      await api.start()
      assert(expressObj.listen.called)
    })
    it('should use routes', async () => {
      await api.start()
      assert(expressObj.use.calledWith(routes))
    })
    it('should use bodyParser', async () => {
      await api.start()
      assert(expressObj.use.calledWith(bodyParser))
    })
    it('should call pixelHandler', async () => {
      await api.start()
      assert(pixelHandler.init.called)
    })
  })
})
