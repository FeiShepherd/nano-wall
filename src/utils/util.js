'use strict'

const sortAddresses = array => {
  return array.sort((a, b) => {
    return a.localeCompare(b)
  })
}

const convertToObject = array => {
  let object = {}
  array.forEach(string => {
    object[string] = 1
  })
  return object
}

module.exports = {
  sortAddresses,
  convertToObject,
}
