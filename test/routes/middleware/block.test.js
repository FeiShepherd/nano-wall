"use strict"

const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("Middleware block", () => {
  let middleware, res, req, next, sampleBlock, pixelHandler, client
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub()
    }
    res.status.returns(res)
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      validateBlock: sinon.stub()
    }
    sampleBlock = require('./sample-block.js')
    pixelHandler = {
      addressExist: sinon.stub()
    }
    middleware = proxyquire("../../../src/routes/middleware/block.js", {
      "../../utils/pixelHandler": pixelHandler,
      "raiblocks-client": { client }
    })
  })

  describe("#setAddress()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.setAddress, "function")
      assert.equal(middleware.setAddress.length, 3)
    })
    it("should set address to req", () => {
      req.body = {
        block: sampleBlock
      }
      middleware.setAddress(req, res, next)
      assert.equal(
        req.senderAddress,
        "xrb_1qato4k7z3spc8gq1zyd8xeqfbzsoxwo36a45ozbrxcatut7up8ohyardu1z"
      )
    })
    it("should call next", () => {
      req.body = {
        block: sampleBlock
      }
      middleware.setAddress(req, res, next)
      assert(next.called)
    })
  })
  describe("#checkPixels()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.validateBlock, "function")
      assert.equal(middleware.validateBlock.length, 3)
    })
    it("should call next on find", () => {
      let errorMessage
      pixelHandler.addressExist.returns(true)
      req.senderAddress = "blah"
      middleware.checkPixels(req, res, next)
      assert(next.called)
    })

    it("should throw because cannot find", () => {
      let errorMessage
      pixelHandler.addressExist.returns(false)
      req.senderAddress = "blah"
      try {
        middleware.checkPixels(req, res, next)
      } catch (err) {
        errorMessage = err.message
      }
      assert.equal(errorMessage, "cannot find address")
    })
  })
  describe("#validateBlock()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.validateBlock, "function")
      assert.equal(middleware.validateBlock.length, 3)
    })
    it("should validate hash with network", () => {
      req.senderAddress = "blah"
      middleware.validateBlock(req, res, next)
    })
  })
  describe("#updatePixel()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.validateBlock, "function")
      assert.equal(middleware.validateBlock.length, 3)
    })
    it("should update pixel cache")
  })
})
