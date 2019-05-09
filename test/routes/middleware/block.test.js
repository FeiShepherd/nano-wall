'use strict'

const assert = require('assert')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Middleware block', () => {
  let middleware,
    res,
    req,
    next,
    sampleBlock,
    pixelHandler,
    client,
    raiClient,
    responses

  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub(),
      send: sinon.stub(),
      end: sinon.stub()
    }
    res.status.returns(res)
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      validateBlock: sinon.stub()
    }
    sampleBlock = require('./sample-block.js')
    pixelHandler = {
      addressExist: sinon.stub(),
      set: sinon.stub()
    }
    responses = {
      created: {
        started: '1'
      },
      failed: {
        started: '0'
      }
    }
    raiClient = {
      block_confirm: sinon.stub().resolves(responses.created)
    }
    client = sinon.stub().returns(raiClient)
    middleware = proxyquire('../../../src/routes/middleware/block.js', {
      '../../utils/cache.js': pixelHandler,
      'raiblocks-client': { client }
    })
  })
  describe('#checkPixels()', () => {
    it('should have correct format', () => {
      assert(typeof middleware.validateBlock, 'function')
      assert.equal(middleware.validateBlock.length, 3)
    })
    it('should call next on find', () => {
      let errorMessage
      pixelHandler.addressExist.returns(true)
      req.body = {
        block: sampleBlock
      }
      middleware.checkPixels(req, res, next)
      assert(next.called)
      assert(pixelHandler.addressExist.called)
    })
    it('should return because cannot find', () => {
      pixelHandler.addressExist.returns(false)
      req.body = {
        block: sampleBlock
      }
      middleware.checkPixels(req, res, next)
      assert.equal(next.called, false)
    })
  })
  describe('#setAddress()', () => {
    it('should have correct format', () => {
      assert(typeof middleware.setAddress, 'function')
      assert.equal(middleware.setAddress.length, 3)
    })
    it('should set address to req', () => {
      req.body = {
        block: sampleBlock
      }
      middleware.setAddress(req, res, next)
      assert.equal(
        req.block.nanoWallAddress,
        'xrb_1qato4k7z3spc8gq1zyd8xeqfbzsoxwo36a45ozbrxcatut7up8ohyardu1z'
      )
      assert.equal(
        req.block.hash,
        '82D68AE43E3E04CBBF9ED150999A347C2ABBE74B38D6E506C18DF7B1994E06C2'
      )
      assert.equal(
        req.block.senderAddress,
        'xrb_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est'
      )
    })
    it('should call next', () => {
      req.body = {
        block: sampleBlock
      }
      middleware.setAddress(req, res, next)
      assert(next.called)
    })
  })
  describe('#validateBlock()', () => {
    it('should have correct format', () => {
      assert(typeof middleware.validateBlock, 'function')
      assert.equal(middleware.validateBlock.length, 3)
    })
    it('should validate hash with network', async () => {
      req.block = {
        hash: 'blah'
      }
      await middleware.validateBlock(req, res, next)
      assert(raiClient.block_confirm.calledWith({ hash: 'blah' }))
      assert(next.called)
    })
    it('should throw if validate fail', async () => {
      let error
      req.block = {
        hash: 'blah'
      }
      raiClient.block_confirm.returns(responses.failed)
      try {
        await middleware.validateBlock(req, res, next)
      } catch (err) {
        error = err.message
      }
      assert.equal(error, 'failed on block validate')
    })
  })
  describe('#updatePixel()', () => {
    it('should have correct format', () => {
      assert(typeof middleware.validateBlock, 'function')
      assert.equal(middleware.validateBlock.length, 3)
    })
    it('should update pixel cache', () => {
      req.block = {
        senderAddress: 'receive',
        nanoWallAddress: 'sender'
      }
      middleware.updatePixels(req, res, next)
      assert(
        pixelHandler.set.calledWith(
          req.block.nanoWallAddress,
          req.block.senderAddress
        )
      )
    })
  })
})
