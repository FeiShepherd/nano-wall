'use strict'

const assert = require('assert')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Middleware pixel', () => {
  let middleware, res, req, next, pixelHandler
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub(),
    }
    res.status.returns(res)
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      create: sinon.stub(),
    }
    pixelHandler = {
      get: sinon.stub(),
    }
    middleware = proxyquire('../../../src/routes/middleware/pixel.js', {
      '../../utils/cache.js': pixelHandler,
    })
  })
  describe('#getPixel()', () => {
    it('should have correct format', () => {
      assert(typeof middleware.getPixel, 'function')
      assert.equal(middleware.getPixel.length, 3)
    })
    it('should call status', () => {
      middleware.getPixel(req, res, next)
      assert(res.status.calledWith(200))
    })
    it('should response with json', () => {
      middleware.getPixel(req, res, next)
      assert(res.json.called)
    })
    it('should get pixel data from cache and send json', () => {
      middleware.getPixel(req, res, next)
      assert(pixelHandler.get.called)
    })
  })
})
