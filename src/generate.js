let { client } = require("raiblocks-client")
const fs = require("fs")
const util = require("util")
const writeFile = util.promisify(fs.writeFile)
const rai_node_host = "http://[::1]:7076"
const wallet =
  "000D1BAEC8EC208142C99059B393051BAC8380F9B5A2E6B2489A277D81789F3F"

const generate = async () => {
  let raiClient = client({
    rai_node_host
  })
  try {
    addresses = await raiClient.accounts_create({
      wallet,
      count: 250000
    })
    return addresses
  } catch (err) {
    throw err
  }
}
generate()
module.exports = generate
