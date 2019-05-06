'use strict'

let pixelHandler = require('../../utils/cache.js')
let {client} = require('raiblocks-client')

const checkPixels = (req, res, next) => {
  log(`block incoming ${req.body}`)
  if (pixelHandler.addressExist(JSON.parse(req.body.block.block)['link_as_account'])) {
    log(`Found block ${req.body.block}`)
    return next()
  }
  return
}

const setAddress = (req, res, next) => {
  log(`set address ${req.body.block}`)
  if (req.body.block) {
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
  //temp
  return next()

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
  pixelHandler.set(req.block.nanoWallAddress, req.block.senderAddress)
  res.end()
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
