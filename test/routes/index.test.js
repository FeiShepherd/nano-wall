const assert = require("assert")
const sinon = require("sinon")

describe("Routes", () => {
  let router, middlewareMap
  beforeEach(() => {
    middlewareMap = [
      {
        path: "/pixel",
        type: "get",
        methods: ["getPixel"]
      },
      {
        path: "/block",
        type: "post",
        methods: ["checkPixels", "validateBlock", "updatePixels"]
      }
    ]
    router = require("../../src/routes/index.js")
  })
  it("should set up", () => {
    assert.equal(typeof router.stack, "object")
  })
  it("should add correct routes to block", () => {
    middlewareMap.forEach((middleware, index) => {
      const currentRoute = router.stack[index].route
      assert.equal(currentRoute.path, middleware.path)
      middleware.methods.forEach((method, methodIndex) => {
        assert.equal(currentRoute.stack[methodIndex].handle.name, method)
      })
    })
  })
})
