'use strict'

const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("Middleware Hello", () => {
  let middleware, res, req, next
  beforeEach( () => {
    res = {
      send: sinon.stub()
    }
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      hello: sinon.stub()
    }
    middleware = require("../../../src/routes/middleware/hello.js")
  })
  describe("#hello()", () => {
    it('should respond with hello', () => {
      middleware.hello(req, res, next)
      assert(res.send.calledWith('hello'))
    })
  })
})

