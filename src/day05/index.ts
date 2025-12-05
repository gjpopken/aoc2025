import run from "aocrunner"

const testInput1 = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

const testInput2 = 
`3-5
10-14
16-20
12-18
10-21

1
5
8
11
17
32`

const expectedResult2 = 15

interface ParsedInput {
  ranges: string[];
  available: number[];
}

const parseInput = (rawInput: string): ParsedInput => {
  const [rawRanges, rawAvailable] = rawInput.split("\n\n")
  return {
    ranges: rawRanges.split("\n"),
    available: rawAvailable.split("\n").map(m => +m)
  }
}

const part1 = (rawInput: string) => {

  const { ranges, available } = parseInput(rawInput)

  let count = 0

  available.forEach(ingredient => {
    if (determineIfInRange(ingredient, ranges)) count++
  })

  return count
}

const part2 = (rawInput: string) => {
  const { ranges } = parseInput(rawInput)
  const result = countRanges(ranges)

  return result
}

const countRanges = (ranges: string[]): number => {
  let count = 0
  const newRanges: string[] = []
  const sortedRanges = ranges.sort((a, b) => {
    const [lowerA] = a.split("-")
    const [lowerB] = b.split("-")
    return +lowerA - +lowerB
  })

  console.log(sortedRanges);
  

  sortedRanges.forEach((range, i, array) => {
    console.log(range);
    
    const restOfArray = array.filter((arr, j) => j > i)
    const [lower, iUpper] = range.split("-").map(m => +m)
    let nUpper = iUpper

    const lastRange = newRanges[newRanges.length - 1]
    if (lastRange) {
      const [_, lastUpper] = lastRange.split("-").map(m => +m)
      if (lower <= lastUpper) return
    }

    restOfArray.forEach(ran => {
      const [rLower, rUpper] = ran.split("-").map(m => +m)
      if (rLower <= nUpper) {
        nUpper = nUpper > rUpper ? nUpper : rUpper
      }
    })
    newRanges.push([lower, nUpper].join("-"))
  })

  console.log(newRanges);

  count = newRanges.reduce((acc, cur) => {
    const [lower, upper] = cur.split("-").map(m => +m)
    return acc + (upper - lower + 1)
  }, 0)
  
  return count
}

const determineIfInRange = (ingredient: number, ranges: string[]): boolean => {
  const filteredRanges = ranges.filter(range => filterRanges(range, ingredient))
  return filteredRanges.length > 0
}

const filterRanges = (range: string, ingredient: number): boolean => {
  const [lower, upper] = range.split("-").map(m => +m)
  return lower <= ingredient && upper >= ingredient
}

run({
  part1: {
    tests: [
      {
        input: testInput1,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput2,
        expected: expectedResult2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
