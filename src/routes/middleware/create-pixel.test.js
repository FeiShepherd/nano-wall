"use strict"

const assert = require("assert")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

describe("Middleware create-pixel", () => {
  let middleware, res, req, next, nanoClient
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub().returns(res)
    }
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      hello: sinon.stub()
    }
    nanoClient = {
      account_create: sinon.stub(),
      wallet_create: sinon.stub()
    }
    middleware = proxyquire("./create-pixel.js", {
      "raiblocks-client": nanoClient
    })
  })
  describe("#generateAddress()", () => {
    it("should have correct format", () => {
      assert(typeof middleware.hello, "function")
      assert.equal(middleware.hello.length, 3)
    })
    it("should call wallet_create", () => {
      assert()
    })
  })
  describe("#add to queue()", () => {})
  describe("#send user address with expiration()", () => {})
})

/*
let { client } = require('raiblocks-client');

let raiClient = client({
    rai_node_host: 'http://127.0.0.1:7076'
});

let account = 'xrb_3xmhxujshtt51npreosm4afcy5gge31q9wryf571jbtwky8i99pstuamxsob';

raiClient.account_balance({ account: account }).then(balance => {
    return raiClient.mrai_from_raw({ amount: balance.balance }).then(mrai => {
        console.log('Account', account, 'has', mrai.amount, 'raiblocks!');
    });
});

*/
