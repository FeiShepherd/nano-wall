const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe('Server', () => {
  let express, api, expressObj, routes
  beforeEach(() => {
    expressObj = {
      get: sinon.stub(),
      listen: sinon.stub(),
      use: sinon.stub()
    }
    routes = sinon.stub
    express = sinon.stub().returns(expressObj)
    api = proxyquire('../src/server.js', {
      express: express,
      './routes/index.js': routes
    })
  })
  describe('#start()', () => {
    beforeEach( () => {
      api.start()
    })
    it('should start express', () => {
      assert(express.called)
    })
    it('should listen', () => {
      assert(expressObj.listen.called)
    })
    it('should use routes', () => {
      assert(expressObj.use.calledWith(routes))
    })
  })
})
