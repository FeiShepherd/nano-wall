"use strict"

const { addressExist } = require("../../utils/pixelHandler.js")
let { client } = require("raiblocks-client")

const setAddress = (req, res, next) => {
  if (req.body.block) {
    //TODO: make sure link as account is receiver
    if (req.body.block.block) {
      const block = req.body.block
      req.block = {
        senderAddress: JSON.parse(block.block)["link_as_account"],
        hash: block["hash"]
      }
      return next()
    }
  }
  throw new Error("block not set")
}

const checkPixels = (req, res, next) => {
  if (typeof req.block.senderAddress === "string") {
    if (addressExist(req.block.senderAddress)) {
      return next()
    }
  }
  throw new Error("cannot find address")
}

const validateBlock = async (req, res, next) => {
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
  next()
}

module.exports = {
  setAddress,
  validateBlock,
  checkPixels,
  updatePixels
}
