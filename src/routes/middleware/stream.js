"use strict"

const convertBlockStream = (req, res, next) => {
  let body = ""
  req.on("data", chunk => body += chunk.toString())
  req.on("end", () => {
    const block = JSON.parse(body)
    req.body = {
      block
    }
    next()
  })
}

module.exports = {
  convertBlockStream
}
