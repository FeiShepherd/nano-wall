'use strict'

let pixelHandler = require('../../utils/pixelHandler.js')
let {client} = require('raiblocks-client')

const checkPixels = (req, res, next) => {
  log(`block incoming ${req.body}`)
  log(`pixels ${JSON.stringify(pixelHandler.getPixels())}`)
  if (pixelHandler.addressExist(JSON.parse(req.body.block.block)['link_as_account'])) {
    log(`Found block ${req.body.block}`)
    return next()
  }
  return
}

const setAddress = (req, res, next) => {
  log(`set address ${req.body.block}`)
  if (req.body.block) {
    //TODO: make sure link as account is receiver
    if (req.body.block.block) {
      const block = req.body.block
      req.block = {
        nanoWallAddress: JSON.parse(block.block)['link_as_account'],
        hash: block['hash'],
        senderAddress: block['account'],
      }
      return next()
    }
  }
  throw new Error('block not set')
}

const validateBlock = async (req, res, next) => {
  log(`validate block ${req.block}`)
  const {hash} = req.block
  let raiClient = client({
    rai_node_host: process.env.RAI_NODE_HOST,
  })

  const confirm = await raiClient.block_confirm({
    hash,
  })
  if (confirm.started === '1') {
    return next()
  }
  throw new Error('failed on block validate')
}

const updatePixels = (req, res, next) => {
  log(`update pixel ${req.block}`)
  pixelHandler.setPixel(req.block.nanoWallAddress, req.block.senderAddress)
  res.send('done')
}

const log = str => {
  if (process.env.NODE_ENV === 'development') {
    console.log(str)
  }
}

module.exports = {
  setAddress,
  validateBlock,
  checkPixels,
  updatePixels,
}
