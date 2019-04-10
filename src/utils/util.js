'use strict'

const sortAddresses = inputArray => {
  return inputArray.sort(function(a, b) {
    return a.localeCompare(b)
  })
}

module.exports = {
  sortAddresses,
}
