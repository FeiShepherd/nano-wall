"use strict"

const router = require("express").Router()
const { getPixel } = require("./middleware/pixel.js")
const {
  validateBlock,
  checkPixels,
  updatePixels
} = require("./middleware/block.js")

router.get("/pixel", getPixel)
router.post("/block", checkPixels, validateBlock, updatePixels)

module.exports = router
