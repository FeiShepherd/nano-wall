'use strict'

const {addresses} = require('./addresses.json')

const sorted = addresses
  .reduce((total, element) => {
    return total.concat(element.accounts)
  }, [])
  .sort(function(a, b) {
    return a.localeCompare(b)
  })

const findSorted = target => {
  let found = false
  let array = [0, sorted.length - 1]
  while (!found) {
    const middle = Math.floor((array[1] - array[0]) / 2) + array[0]
    const locale = sorted[middle].localeCompare(target)
    if (locale === 1) {
      array[1] = middle
    } else if (locale === -1) {
      array[0] = middle
    } else {
      found = middle
    }
  }
}


module.exports = {
  sort,
  find
}
