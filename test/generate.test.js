const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("generator", () => {
  let generate, raiClient, host, client, response
  beforeEach(() => {
    rai_node_host = "http://[::1]:7076"
    response = {
      accounts: [
        "xrb_3e3j5tkog48pnny9dmfzj1r16pg8t1e76dz5tmac6iq689wyjfpi00000000",
        "xrb_1e5aqegc1jb7qe964u4adzmcezyo6o146zb8hm6dft8tkp79za3s00000000"
      ]
    }
    raiClient = {
      accounts_create: sinon.stub().resolves(response)
    }
    client = sinon.stub().returns(raiClient)
    generate = proxyquire("../src/generate.js", {
      "raiblocks-client": { client }
    })
  })
  describe("#generate()", () => {
    it("should call client with host", async () => {
      await generate()
      assert(client.calledWith({ rai_node_host }))
    })
    it("should call create account", async () => {
      await generate()
      assert(
        raiClient.accounts_create.calledWith({
          wallet: sinon.match.string,
          count: sinon.match.number
        })
      )
    })
    it("should catch error", async () => {
      let error
      raiClient.accounts_create.rejects("test")
      try {
        await generate()
      } catch (err) {
        error = err
      }
      assert.equal(error.name, "test")
    })
    it("should store addresses into json file", () => {})
  })
})
