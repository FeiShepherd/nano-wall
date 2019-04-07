const express = require("express")
const routes = require("./routes/index.js")

const start = () => {
  const app = express()

  app.use(routes)

  app.listen(process.env.PORT || 3000, () =>
    console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
  )
}

module.exports = {
  start
}
