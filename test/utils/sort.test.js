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
})
