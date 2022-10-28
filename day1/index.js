// https://adventofcode.com/2021/day/1

// read a file
const { promises: fs } = require("fs");

const getData = async () => {
  const input = await fs.readFile(__dirname + "/input.txt", "utf8");
  const lines = input.split("\n");
  console.log("Total lines", lines.length);
  return lines.map(Number);
};

// How many measurements are larger than the previous measurement?
const part1 = (data) => {
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (i === 0) continue;
    if (data[i] > data[i - 1]) count++;
  }
  return count;
};

/**
 * Consider sums of a three-measurement sliding window.
 * How many sums are larger than the previous sum?
 * @param {array} data
 */
const part2 = (data) => {
  let count = 0;
  let lastSum = 0;
  for (let i = 0; i < data.length; i++) {
    const window = data.slice(i, i + 3);
    if (window.length < 3) continue;
    const sum = window.reduce((a, b) => a + b);
    console.log("window", window, sum, lastSum, sum > lastSum);
    if (i === 0) {
      continue;
    }
    if (sum > lastSum) {
      count++;
    }
    lastSum = sum;
  }
  return count;
};

const main = async () => {
  const data = await getData();
  // console.log("Part 1", part1(data));
  console.log("Part 2", part2(data));
};

main();
