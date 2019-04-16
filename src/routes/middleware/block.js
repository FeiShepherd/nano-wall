"use strict"

const { addressExist } = require("../../utils/pixelHandler.js")

const setAddress = (req, res, next) => {
  if (req.body.block) {
    //TODO: make sure link as account is receiver
    if (req.body.block.block) {
      const block = JSON.parse(req.body.block.block)
      req.senderAddress = block["link_as_account"]
      return next()
    }
  }
  throw new Error("block not set")
}

const checkPixels = (req, res, next) => {
  if (typeof req.senderAddress === "string") {
    if (addressExist(req.senderAddress)) {
      return next()
    }
  }
  throw new Error("cannot find address")
}

const validateBlock = (req, res, next) => {}

const updatePixels = (req, res, next) => {
  next()
}

module.exports = {
  setAddress,
  validateBlock,
  checkPixels,
  updatePixels
}
