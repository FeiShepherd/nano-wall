const assert = require('assert')
const cache = require('../../src/utils/cache.js')
describe('cache', () => {
  describe('#init()', () => {
    it('should not be equal', async () => {
      let temp1 = JSON.stringify(cache.get())
      let temp2 = JSON.stringify(await cache.init())
      assert.notEqual(temp1, temp2)
    })
  })
  describe('#get()', () => {
    it('should get object', () => {
      assert.equal(typeof cache.get(), 'object')
    })
  })
  describe('#set()', () => {
    it('should be able to get what was set', () => {
      cache.set('1', '2')
      assert.equal(cache.get()['1'], 2)
    })
  })
  describe('#addressExist()', () => {
    it('should return false', () => {
      assert.equal(cache.addressExist('doesnt exist'), false)
    })
    it('should return true', () => {
      assert.equal(cache.addressExist(1), true)
    })
  })
  describe('#backUp()', () => {
    it('should write to file', () => {
      
    })
  })
  it('should work with other require', () => {
    const cache2 = require('../../src/utils/cache.js')
    cache.set('1','2')
    assert.equal(cache2.get()['1'], '2')
  })
})
