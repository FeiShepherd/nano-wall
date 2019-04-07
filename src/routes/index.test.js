const assert = require("assert")
const router = require("./index.js")

describe("Routes", () => {
  it("should set router", () => {
    assert.equal(typeof router.stack, 'object')
  })
})
