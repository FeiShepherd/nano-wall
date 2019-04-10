const {addresses} = require('./addresses.json')

let concated = addresses.reduce((total, element) => {
  return total.concat(element.accounts)
}, [])

const findBrute = target => {
  const sorted = concated.sort(function(a, b) {
    return a.localeCompare(b)
  })
  var a = new Date().getMilliseconds()
  console.log(sorted.find(e => e === target))
  var b = new Date().getMilliseconds()
  return b - a
}

const findSorted = target => {
  const sorted = concated.sort(function(a, b) {
    return a.localeCompare(b)
  })
  var a = new Date().getMilliseconds()
  let found = false
  let array = [0, sorted.length - 1]
  let counts = 0
  while (!found) {
    counts++
    const middle = Math.floor((array[1] - array[0]) / 2) + array[0]
    const locale = sorted[middle].localeCompare(target)
    if (locale === 1) {
      array[1] = middle
    } else if (locale === -1) {
      array[0] = middle
    } else {
      found = middle
      console.log(sorted[middle])
    }
  }
  console.log(counts)
  var b = new Date().getMilliseconds()
  return b - a
}

console.log(
  findBrute('xrb_3zqrgkbczskzdtp54wmp49b1imx1t1ppp5cd6x1hz8ocdhwps6czguef3iy1'),
)

console.log(
  findSorted(
    'xrb_3zqrgkbczskzdtp54wmp49b1imx1t1ppp5cd6x1hz8ocdhwps6czguef3iy1',
  ),
)
