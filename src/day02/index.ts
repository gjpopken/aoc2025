import run from "aocrunner"

interface Range {
  upperBound: number
  lowerBound: number
}

const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
const testInput2 = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124, 1-9`

const parseInput = (rawInput: string) => {
  const output = rawInput.split(",").map((ran) => {
    return {
      upperBound: +ran.split("-")[1],
      lowerBound: +ran.split("-")[0],
    } as Range
  })
  return output
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let runningCount = 0

  input.forEach((ran) => {
    for (let i = ran.lowerBound; i < ran.upperBound + 1; i++) {
      if (String(i).length % 2 !== 0) {
        // nothing
      }
      const midpointIndex = String(i).length / 2
      const firstPart = String(i).slice(0, midpointIndex)
      const lastPart = String(i).slice(midpointIndex, String(i).length + 1)
      // console.log({originalString: String(i)});
      if (firstPart === lastPart) {
        runningCount += i
      }
    }
  })

  return runningCount
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let runningCount = 0

  input.forEach( ran => {
    const result = iterateThroughAllNumbersInRange(ran)
    runningCount += result
  })

  return runningCount
}

const iterateThroughAllNumbersInRange = (range: Range) => {
  const { upperBound, lowerBound } = range
  let sumOfInvalidNumbersInRange = 0
  for (let i = lowerBound; i < upperBound + 1; i++) {
    if (isInvalidNumber(i)) {
      sumOfInvalidNumbersInRange += i
    }
  }
  return sumOfInvalidNumbersInRange
}

const isInvalidNumber = (num: number): boolean => {
  const numberLength = String(num).length
  if (numberIsAllSameDigit(num)) return true
  // if (numberLength % 2 !== 0) return false

  const result = iterateThroughSubstrings(num)

  return result > 0
}

const numberIsAllSameDigit = (num: number): boolean => {
  return String(num)
    .split("")
    .every((en) => en === String(num).split("")[0]) && String(num).length > 1
}

const iterateThroughSubstrings = (num: number) => {
  const asString = String(num)
  // console.log("original:", asString);
  
  for (let r = Math.floor(asString.length / 2); r > 0; r--) {
    const regex = `(\\d{${r}})`
    if (asString.length % r !== 0) continue
    else if (substringsAreRepeated(asString, new RegExp(regex, "g"))) {
      return num
    }
  }
  return 0
}

const substringsAreRepeated = (wholeString: string, regex: RegExp): boolean => {
  const matches = [...wholeString.matchAll(regex)]
  if (matches.length > 0 && matches.every((m) => m[0] === matches[0][0])) {
    return true
  }
  return false
}

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 1227775554,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput2,
        expected: 4174379265,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
