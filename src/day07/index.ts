import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  let grandTotal = 0
  grandTotal += processLine(input, input[0], 1)

  return grandTotal
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const processLine = (
  wholeArray: string[],
  lineBefore: string,
  index: number,
): number => {
  let timesSplit = 0
  const currentLine = wholeArray[index]
  // console.log("Current line: ", currentLine);
  

  const getCharacterAbove = (lineIndex: number, columnIndex: number) => {
    // console.log("char above:", lineBefore[columnIndex], columnIndex)

    return lineBefore[columnIndex]
  }
  // iterate through each character in a line
  const splitLine = currentLine.split("")
  splitLine.forEach((char, i) => {
    if (char === "^") {
      // console.log("Char above is a ^")

      // what happens when we split a new line
      if (getCharacterAbove(index, i) === "|") {
        splitLine[i - 1] && (splitLine[i - 1] = "|")
        splitLine[i - 1] && (splitLine[i + 1] = "|")
        timesSplit++
      }
    } else if (
      char === "." &&
      (getCharacterAbove(index, i) === "|" ||
        getCharacterAbove(index, i) === "S")
    ) {
      // console.log("char above is a line or S and current char is a dot")

      splitLine[i] = "|"
    }
  })

  console.log("line:", splitLine.join(""))

  if (wholeArray[index + 1]) {
    const result = processLine(wholeArray, splitLine.join(""), index + 1)
    return result + timesSplit
  }
  return timesSplit
}

run({
  part1: {
    tests: [
      {
        input: `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`,
        expected: 21,
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
