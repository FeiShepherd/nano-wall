const assert = require('assert')
const util = require('../../src/utils/util.js')

describe('util', () => {
  describe('#sortAddresses()', () => {
    it('should sort string array', () => {
      const sampleData = ['z2', 'z1', 'd', 'a', 'z']
      const sortedArray = util.sortAddresses(sampleData)
      assert.deepEqual(sortedArray, ['a', 'd', 'z', 'z1', 'z2'])
    })
  })
  describe('#convertToObject()', () => {
    it('should convert array to object', () => {
      const sampleData = ['z2', 'z1']
      const convertedObject = util.convertToObject(sampleData)
      assert.deepEqual(convertedObject, {
        z1: 1,
        z2: 1,
      })
    })
  })
  describe('#addressExist()', () => {
    it('should return true if exists', () => {
      const sampleData = {
        z1: 1,
        z2: 1,
      }
      const addressExist = util.addressExist(sampleData, 'z1')
      assert.equal(addressExist, true)
    })
    it('should return false if doesnt', () => {
      const sampleData = ['z1', 'z2', 'z3']
      const addressExist = util.addressExist(sampleData, 'z4')
      assert.equal(addressExist, false)
    })
  })
})
