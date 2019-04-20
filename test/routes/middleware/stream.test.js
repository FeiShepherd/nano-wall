"use strict"

const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")
const { EventEmitter } = require("events")
describe("Middleware stream", () => {
  let middleware, res, req, next
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub()
    }
    res.status.returns(res)
    next = sinon.stub()
    req = new EventEmitter()
    middleware = {
      convertBlockStream: sinon.stub()
    }
    middleware = require("../../../src/routes/middleware/stream.js")
  })
  describe("#convertBlockStream()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.convertBlockStream, "function")
      assert.equal(middleware.convertBlockStream.length, 3)
    })
    it("should read buffer and set to body", done => {
      const blockStr = '{"1":"2"}'
      middleware.convertBlockStream(req, res, next)
      req.emit("data", Buffer.from(blockStr), 'uft8')
      req.emit("end")
      assert.equal(req.body.block['1'], JSON.parse(blockStr)['1'])
      assert(next.called)
      done()
    })
  })
})
