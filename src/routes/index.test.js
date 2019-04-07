const assert = require("assert")
const sinon = require("sinon")
const router = require("./index.js")
const proxyquire = require("proxyquire")

describe("Routes", () => {
  let router, middlewares
  beforeEach(() => {
    middlewares = [
      {
        method: "get",
        chain: ["/", () => {}]
      },
      {
        method: "post",
        chain: ["/test", () => {}, () => {}]
      },
      {
        method: "delete",
        chain: ["/test2", () => {}]
      },
      {
        method: "patch",
        chain: ["/test3", () => {}]
      }
    ]
    router = proxyquire("./index.js", {
      "./routes.js": middlewares
    })
  })
  it("should set up", () => {
    assert.equal(typeof router.stack, "object")
  })
  it("should map 4 methods to stack", () => {
    assert.equal(router.stack.length, 4)
  })
  it("should map methods correctly", () => {
    assert.equal(router.stack[0].route.methods.get, true)
    assert.equal(router.stack[1].route.methods.post, true)
    assert.equal(router.stack[2].route.methods.delete, true)
    assert.equal(router.stack[3].route.methods.patch, true)
  })
  it("should map path", () => {
    assert.equal(router.stack[1].route.path, '/test')
  })
  it("should map middleware functions", () => {
    assert.equal(router.stack[1].route.stack.length, 2)
  })
})
