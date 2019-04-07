const express = require("express")
const routes = require("./routes/index.js")

const start = () => {
  const app = express()

  app.use(routes)

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  )
}

module.exports = {
  start
}
