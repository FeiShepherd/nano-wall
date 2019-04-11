"use strict"

const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("Middleware block", () => {
  let middleware, res, req, next, sampleBlock
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub().returns(res)
    }
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      validateBlock: sinon.stub()
    }
    middleware = require("../../../src/routes/middleware/block.js")

    sampleBlock = {
      account:
        "xrb_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est",
      hash: "82D68AE43E3E04CBBF9ED150999A347C2ABBE74B38D6E506C18DF7B1994E06C2",
      block: `{\n    
             \"type\": \"state\",\n
             \"account\": \"xrb_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est\",\n    
             \"previous\": \"BE716FE4E21E0DC923ED67543601090A17547474CBA6D6F4B3FD6C113775860F\",\n    
             \"representative\": \"xrb_1stofnrxuz3cai7ze75o174bpm7scwj9jn3nxsn8ntzg784jf1gzn1jjdkou\",\n    
             \"balance\": \"5256157000000000000000000000000000000\",\n    
             \"link\": \"5D1AA8A45F8736519D707FCB375976A7F9AF795091021D7E9C7548D6F45DD8D5\",\n    
             \"link_as_account\": \"xrb_1qato4k7z3spc8gq1zyd8xeqfbzsoxwo36a45ozbrxcatut7up8ohyardu1z\",\n    
             \"signature\": \"5AF10D3DDD0E3D7A0EF18670560D194C35A519943150650BBBE0CBDB2A47A1E41817DA69112F996A9898E11F1D79EF51C041BD57C1686B81E7F9DFCCFFBAB000\",\n    
            \"work\": \"13ae0ea3e2af9004\"\n    
         }\n`,
      amount: "90000000000000000000000000000000000",
      is_send: "true",
      subtype: "send"
    }
  })
  describe("#checkPixels()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.validateBlock, "function")
      assert.equal(middleware.validateBlock.length, 3)
    })
    it("should check if block is in pixels cache")
  })
  describe("#validateBlock()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.validateBlock, "function")
      assert.equal(middleware.validateBlock.length, 3)
    })
    it("should validate hash with network")
  })
  describe("#updatePixel()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.validateBlock, "function")
      assert.equal(middleware.validateBlock.length, 3)
    })
    it("should update pixel cache")
  })
})
