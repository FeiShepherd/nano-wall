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
    log('Unlocking wallet')
    unlock = await raiClient.password_enter({
      wallet,
      password: ""
    })
    log('Wallet unlocked')
    if (unlock.valid === '1') {
      let addresses = []
      for (let i = 0; i < iterations; i++) {
        addresses.push(
          await raiClient.accounts_create({
            wallet,
            count,
          }),
        )
        log(` ${i / 250}% done `)
      }
      await writeFile('addresses', JSON.stringify({addresses}))
      return 1
    } else {
      throw new Error('could not unlock wallet')
    }
  } catch (err) {
    throw err
  }
}

const log = string => {
  if (process.argv[2] === '-v') console.log(string)
}

generate()
module.exports = generate
