const express = require("express")

const start = () => {
  const app = express()

  app.get("/", (req, res) => res.send("Hello World!"))
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  )
}

module.exports = {
  start
}
