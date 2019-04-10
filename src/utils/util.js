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

const addressExist = (object, target) => {
  //TODO: come up with an even faster search
  return target in object
}

module.exports = {
  sortAddresses,
  addressExist,
  convertToObject,
}
