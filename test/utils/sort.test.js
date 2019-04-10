const assert = require('assert')
const util = require('../../src/utils/util.js')

describe('util', () => {
  it('should sort string array', () => {
    const sampleData = ['z2', 'z1', 'd', 'a', 'z']
    const sortedArray = util.sortAddresses(sampleData)
    assert.deepEqual(sortedArray, ['a', 'd', 'z', 'z1', 'z2'])
  })
})
