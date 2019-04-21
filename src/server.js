const express = require('express')
const routes = require('./routes/index.js')
const bodyParser = require('body-parser')
let pixelHandler = require('./utils/cache.js')

const start = async(PORT = 3000) => {
  const app = express()
  await pixelHandler.init()
  app.use(routes)
  app.use(bodyParser)
  app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`)
  )

  return app
}

module.exports = {
  start
}
