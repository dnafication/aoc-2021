// https://adventofcode.com/2021/day/3

const { promises: fs } = require("fs")

const getData = async () => {
  const input = await fs.readFile(__dirname + "/input.txt", "utf8")
  const lines = input.split("\n")
  console.log("Total lines", lines.length)
  return lines
}

// convert binary to decimal
const binaryToDecimal = (binary) => {
  return parseInt(binary, 2)
}

/**
 * What is the power consumption of the submarine?
 * (Be sure to represent your answer in decimal, not binary.)
 * @param {array} data
 * @returns
 */
const part1 = (data) => {
  const sumOfOnes = data.reduce((acc, curr) => {
    const binary = curr.split("")
    binary.forEach((bit, index) => {
      if (bit === "1") {
        acc[index] += 1
      }
    })
    return acc
  }, Array(data[0].length).fill(0))

  // console.log("Sum of ones", sumOfOnes)

  const mostCommonBits = sumOfOnes.map((sum) => {
    if (sum > 500) {
      return 1
    }
    return 0
  })

  const leastCommonBits = sumOfOnes.map((sum) => {
    if (sum < 500) {
      return 1
    }
    return 0
  })

  const gammaRate = binaryToDecimal(mostCommonBits.join(""))
  const epsilonRate = binaryToDecimal(leastCommonBits.join(""))

  return gammaRate * epsilonRate
}

const part2 = (data) => {
  let index = 0
  let dataForOGRating = data.slice()
  let dataForCSRating = data.slice()
  while (dataForOGRating.length > 1) {
    let ones = dataForOGRating.filter((line) => line.charAt(index) === "1")
    let zeros = dataForOGRating.filter((line) => line.charAt(index) === "0")
    dataForOGRating = ones.length >= zeros.length ? ones : zeros
    index += 1
  }

  index = 0
  while (dataForCSRating.length > 1) {
    let ones = dataForCSRating.filter((line) => line.charAt(index) === "1")
    let zeros = dataForCSRating.filter((line) => line.charAt(index) === "0")
    dataForCSRating = ones.length >= zeros.length ? zeros : ones
    index += 1
  }

  return (
    binaryToDecimal(dataForOGRating[0]) * binaryToDecimal(dataForCSRating[0])
  )
}

const main = async () => {
  const data = await getData()
  console.log("Part 1", part1(data))
  console.log("Part 2", part2(data))
}

main()
