const assert = require('assert')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const inMemoryPixelHandler = require('../../src/utils/pixelHandler.js')

describe('Utils pixelHandler', () => {
  let pixelHandler, fs
  beforeEach(() => {
    fs = {
      readFile: sinon.stub().yields(null, [1]),
    }
    pixelHandler = proxyquire('../../src/utils/pixelHandler.js', {
      fs: fs,
    })
  })
  describe('#setPixel', () => {
    it('should set and get pixel', () => {
      pixelHandler.setPixel('z99', 'senderlel')
      const pixelMap = pixelHandler.getPixels()
      assert.equal(pixelMap['z99'], 'senderlel')
    })
    it('should set in memory', () => {
      inMemoryPixelHandler.setPixel('z500', 'cat')
    })
    it('should retrieve in memory', () => {
      const pixels = inMemoryPixelHandler.getPixels()
      assert.equal(pixels['z500'], 'cat')
    })
  })
  describe('#getPixels', () => {
    it('should return pixels', () => {
      assert.equal(typeof pixelHandler.getPixels(), 'object')
    })
  })
  describe('#initFromFile()', () => {
    it('should call fs readFile', () => {
      pixelHandler.initFromFile('./fakefile.json')
      assert(fs.readFile.calledWith('./fakefile.json'))
    })
    it('should throw if fail', async () => {
      fs.readFile.yields(new Error('lel'), null)
      let error
      try {
        await pixelHandler.initFromFile('./fakefile.json')
      } catch (err) {
        error = err
      }
      assert.equal(error.message, 'lel')
    })
    it('should retrieve data from pixels', async () => {
      fs.readFile.yields(null, {'v10':'p1'})
      await pixelHandler.initFromFile('./fakefile.json')
      const pixels = pixelHandler.getPixels()
      assert.equal(pixels['v10'], 'p1')
    })
  })
  describe('#addressExist()', () => {
    it('should return true if exists', () => {
      pixelHandler.setPixel('z1', 'dog')
      const addressExist = pixelHandler.addressExist('z1')
      assert.equal(addressExist, true)
    })
    it('should return false if not exist', () => {
      const addressExist = pixelHandler.addressExist('z1')
      assert.equal(addressExist, false)
    })
  })
})
