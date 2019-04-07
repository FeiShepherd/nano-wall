const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("Server", () => {
  let express, api, expressObj
  beforeEach(() => {
    expressObj = {
      get: sinon.stub(),
      listen: sinon.stub()
    }
    express = sinon.stub().returns(expressObj)
    api = proxyquire("../src/server.js", {
      express: express
    })
  })
  describe("#start()", () => {
    it("should start express", () => {
      api.start()
      assert(express.called)
    })
    it("should listen", () => {
      api.start()
      assert(expressObj.listen.called)
    })
  })
})
