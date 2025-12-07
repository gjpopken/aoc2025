import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let grandTotal = 0
  for (let i = 1; i < input.length; i++) {
    grandTotal+=processLine(input[i], input[i-1])
  } 
  
  return
}

const processLine = (currentLine: string, lineBefore: string) => {

  let timesSplit = 0

  const getCharacterAbove = (i: number) => {
    return lineBefore[i]
  }
  // iterate through each character in a line
  const splitLine  = currentLine.split("")
  splitLine.forEach((char, index) => {
    if (char === "^") {
      // what happens when we split a new line
      if (getCharacterAbove(index) === "|") {
        splitLine[index - 1] && (splitLine[index - 1] = "|")
        splitLine[index - 1] && (splitLine[index + 1] = "|")
        timesSplit++
      }
    } else if (char === "." && getCharacterAbove(index) === "|") {
      splitLine[index] = "|"
    }
  })

  return timesSplit
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
