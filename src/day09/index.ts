import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split('\n').map(m => m.split(",").map(n => +n))


// abs(x1-x2 + 1) * abs(y1-y2 + 1)
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  // console.log(input);

  const largestArea = getLargestArea(input, 0)

  return largestArea
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const getLargestArea = (input: number[][], currentLargest: number) => {
  if (input.length <= 1) return currentLargest
  const coord = input[0]
  const [x1, y1] = coord
  const otherCoords = input.filter((_, i) => i > 0)
  // console.log(otherCoords);
  
  let largestArea = currentLargest

  for (const oCoord of otherCoords) {
    const [x2, y2] = oCoord
    const area = (Math.abs(x2 - x1 ) + 1) * (Math.abs(y2 - y1) + 1)
    // console.log(`Area: ${area}`);
    
    if (area > largestArea) {
      largestArea = area
    }
  }

  return getLargestArea(otherCoords, largestArea)
}

run({
  part1: {
    tests: [
      {
        input: `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`,
        expected: 50,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
