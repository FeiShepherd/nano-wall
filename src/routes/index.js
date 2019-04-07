"use strict"

const router = require("express").Router()
const { hello } = require("./middleware/hello.js")

router.get('/', hello)

module.exports = router
