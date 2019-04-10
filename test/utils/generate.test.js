const assert = require('assert')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('generator', () => {
  let generate, raiClient, host, client, response, fs, util

  const {
    wallet,
    rai_node_host,
    iterations,
    count,
  } = require('../../src/utils/config.json')

  beforeEach(() => {
    responses = {
      accounts: {
        accounts: [
          'xrb_3e3j5tkog48pnny9dmfzj1r16pg8t1e76dz5tmac6iq689wyjfpi00000000',
          'xrb_1e5aqegc1jb7qe964u4adzmcezyo6o146zb8hm6dft8tkp79za3s00000000',
        ],
      },
      unlock_success: {
        valid: '1',
      },
      unlock_fail: {
        valid: '0',
      },
      locked: {
        locked: '1',
      },
    }
    raiClient = {
      wallet_lock: sinon.stub().resolves(responses.locked),
      accounts_create: sinon.stub().resolves(responses.accounts),
      password_enter: sinon.stub().resolves(responses.unlock_success),
    }
    fs = {
      writeFile: sinon.stub().yields(null, 1),
    }
    util = {
      sortAddresses: sinon.stub().returnsArg(0),
      convertToObject: sinon.stub().returnsArg(0),
    }
    client = sinon.stub().returns(raiClient)
    generate = proxyquire('../../src/utils/generate.js', {
      'raiblocks-client': {client},
      fs: fs,
      './util.js': util,
    })
  })
  describe('#generate()', () => {
    it('should call client with host', async () => {
      await generate()
      assert(client.calledWith({rai_node_host}))
    })
    it('should unlock wallet', async () => {
      await generate()
      assert(
        raiClient.password_enter.calledWith({
          wallet,
          password: '',
        }),
      )
    })
    it('should throw if not valid', async () => {
      let error
      raiClient.password_enter.resolves(responses.unlock_fail)
      try {
        await generate()
      } catch (err) {
        error = err
      }
      assert.equal(error.message, 'could not unlock wallet')
    })
    it('should call create account with 1000 count', async () => {
      await generate()
      assert(
        raiClient.accounts_create.calledWith({
          wallet,
          count,
        }),
      )
    })
    it('should call create account x times', async () => {
      raiClient.accounts_create.callCount = 0
      await generate()
      assert.equal(raiClient.accounts_create.callCount, iterations)
    })
    it('should call sort addresses', async () => {
      await generate()
      assert(util.sortAddresses.called)
    })
    it('should call convertToObject', async () => {
      await generate()
      assert(util.convertToObject.called)
    })
    it('should store addresses into json file', async () => {
      await generate()
      assert(fs.writeFile.called)
    })
    it('should catch error', async () => {
      let error
      raiClient.accounts_create.rejects(new Error('random fail'))
      try {
        await generate()
      } catch (err) {
        error = err
      }
      assert.equal(error.message, 'random fail')
    })
    it('should call lock wallet', async () => {
      await generate()
      assert(raiClient.wallet_lock.called)
    })
    it('should return 1', async () => {
      let returned = await generate()
      assert.equal(returned, 1)
    })
  })
})
