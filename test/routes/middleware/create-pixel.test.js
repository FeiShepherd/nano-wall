'use strict'

const assert = require('assert')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('Middleware create-pixel', () => {
  let middleware, res, req, next
  beforeEach(() => {
    res = {
      json: sinon.stub(),
      status: sinon.stub().returns(res),
    }
    next = sinon.stub()
    req = sinon.stub()
    middleware = {
      create: sinon.stub(),
    }
    middleware = require('../../..//src/routes/middleware/create-pixel.js')
    describe('#generateAddress()', () => {
      it('should have correct format', () => {
        assert(typeof middleware.create, 'function')
        assert.equal(middleware.create.length, 3)
      })
    })
  })
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
