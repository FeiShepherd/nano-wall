const { hello } = require("./middleware/hello.js")

const middlewares = [
  {
    method: "get",
    chain: ["/", hello]
  }
]

module.exports = middlewares
