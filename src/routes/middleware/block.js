"use strict"

const { addressExist, setPixel } = require("../../utils/pixelHandler.js")
let { client } = require("raiblocks-client")

const setAddress = (req, res, next) => {
  log(`set address ${req.body.block}`)
  if (req.body.block) {
    //TODO: make sure link as account is receiver
    if (req.body.block.block) {
      const block = req.body.block
      req.block = {
        senderAddress: JSON.parse(block.block)["link_as_account"],
        hash: block["hash"],
        receiverAddress: block["account"]
      }
      return next()
    }
  }
  throw new Error("block not set")
}

const checkPixels = (req, res, next) => {
  log(`check pixels ${req.block}`)
  if (typeof req.block.receiverAddress === "string") {
    if (addressExist(req.block.receiverAddress)) {
      return next()
    }
  }
  throw new Error("cannot find address")
}

const validateBlock = async (req, res, next) => {
  log(`validate block ${req.block}`)
  const { hash } = req.block
  let raiClient = client({
    rai_node_host: process.env.RAI_NODE_HOST
  })

  const confirm = await raiClient.block_confirm({
    hash
  })
  if (confirm.started === "1") {
    return next()
  }
  throw new Error("failed on block validate")
}

const updatePixels = (req, res, next) => {
  log(`update pixel ${req.block}`)
  setPixel(req.block.receiverAddress, req.block.senderAddress)
  res.send('done')
}

const log = str => {
  if(process.env.NODE_ENV === 'development'){
    console.log(str)
  }
}

module.exports = {
  setAddress,
  validateBlock,
  checkPixels,
  updatePixels
}
