"use strict"

const router = require("express").Router()
const middlewares = require("./routes.js")

middlewares.forEach(route => {
  switch (route.method) {
    case "get":
      router.get(...route.chain)
      break
    case "post":
      router.post(...route.chain)
      break
    case "delete":
      router.delete(...route.chain)
      break
    case "patch":
      router.patch(...route.chain)
      break
  }
})

module.exports = router
