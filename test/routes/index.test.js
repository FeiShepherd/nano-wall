const assert = require("assert")
const router = require("../../src/routes")

describe("Routes", () => {
  it("should set router", () => {
    assert.equal(typeof router.stack, 'object')
  })
})
