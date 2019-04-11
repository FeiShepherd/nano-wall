"use strict"

const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("Middleware pixel", () => {
  let middleware, res, req, next
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub()
    }
    res.status.returns(res)
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      create: sinon.stub()
    }
    middleware = require("../../../src/routes/middleware/pixel.js")
  })
  describe("#getPixel()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.getPixel, "function")
      assert.equal(middleware.getPixel.length, 3)
    })
    it("should call status", () => {
      middleware.getPixel(req, res, next)
      assert(res.status.calledWith(200))
    })
    it("should response with json", () => {
      middleware.getPixel(req, res, next)
      assert(res.json.called)
    })
  })
})
