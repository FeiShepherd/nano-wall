let {client} = require('raiblocks-client')
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const {rai_node_host, wallet, iterations, count} = require('./config.json')

const generate = async () => {
  let raiClient = client({
    rai_node_host,
  })
  try {
    unlock = await raiClient.password_enter({
      wallet,
    })
    if (unlock.valid === '1') {
      let addresses = []
      for (let i = 0; i < iterations; i++) {
        addresses.push(
          await raiClient.accounts_create({
            wallet,
            count,
          }),
        )
        if (process.argv[2] === '-v') console.log(` ${i / 250}% done `)
      }
      await writeFile('addresses', JSON.stringify({addresses}))
      await raiClient.wallet_lock({
        wallet,
      })
      return 1
    } else {
      throw new Error('could not unlock wallet')
    }
  } catch (err) {
    throw err
  }
}
generate()
module.exports = generate
