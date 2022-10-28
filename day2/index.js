// https://adventofcode.com/2021/day/2

// read a file
const { promises: fs } = require("fs")

const getData = async () => {
  const input = await fs.readFile(__dirname + "/input.txt", "utf8")
  const lines = input.split("\n")
  console.log("Total lines", lines.length)
  return lines.map((line) => {
    const [instruction, unit] = line.split(" ")
    return { instruction, unit: parseInt(unit) }
  })
}
/**
 * Calculate the horizontal position and depth you would have after following the planned course.
 * What do you get if you multiply your final horizontal position by your final depth?
 * @param {array} data
 */
const part1 = (data) => {
  // console.log("Part 1", data)
  let x = 0
  let y = 0
  for (let i = 0; i < data.length; i++) {
    const { instruction, unit } = data[i]
    if (instruction === "up") {
      y -= unit
    } else if (instruction === "down") {
      y += unit
    } else if (instruction === "forward") {
      x += unit
    }
  }
  return x * y
}

const part2 = (data) => {
  let depth = 0
  let horizontalPosition = 0
  let aim = 0
  for (let i = 0; i < data.length; i++) {
    const { instruction, unit } = data[i]
    if (instruction === "up") {
      aim -= unit
    } else if (instruction === "down") {
      aim += unit
    } else if (instruction === "forward") {
      horizontalPosition += unit
      depth += aim * unit
    }
  }
  return horizontalPosition * depth
}

const main = async () => {
  const data = await getData()
  console.log("Part 1", part1(data))
  console.log("Part 2", part2(data))
}

main()
