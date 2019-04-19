"use strict"

const router = require("express").Router()
const { getPixel } = require("./middleware/pixel.js")
const {
  validateBlock,
  checkPixels,
  updatePixels,
  setAddress
} = require("./middleware/block.js")

router.get("/pixel", getPixel)
router.post("/block", checkPixels, setAddress, validateBlock, updatePixels)

module.exports = router
