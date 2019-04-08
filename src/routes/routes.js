const { hello } = require("./middleware/hello.js")

const middlewares = [
  {
    method: "get",
    chain: ["/", hello]
  },
  {
    method: "post",
    chain: ["/pixel"]
  }
]


module.exports = middlewares
