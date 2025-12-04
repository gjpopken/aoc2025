import run from "aocrunner"

type CoordinatesYX = number[]

interface RemovedRolls {
  totalRemoved: number
  coordinates: CoordinatesYX[]
}

const testInput1 = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

const parseInput = (rawInput: string) => rawInput.split("\n")

const part1 = (rawInput: string) => {
  const rows = parseInput(rawInput)
  const rolls = processWholeStack(rows)

  return rolls
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const result = processWholeStackV2(input)

  return result
}

const processWholeStackV2 = (stack: string[]): number => {
  let rolls = 0
  const coordinates: CoordinatesYX[] = []
  stack.forEach((row, i, array) => {
    const rowBefore = array[i - 1]
    const rowAfter = array[i + 1]
    const { totalRemoved, coordinates: coords } = getNumberOfRollsV2(
      row,
      rowBefore,
      rowAfter,
      i,
    )
    coords.forEach((coord) => coordinates.push(coord))
    rolls += totalRemoved
  })

  if (rolls !== 0) {
    const newStack = createNewStack(stack, coordinates)
    const nResult = processWholeStackV2(newStack)
    return rolls + nResult
  } else {
    return rolls
  }
}

const createNewStack = (
  stack: string[],
  coordinates: CoordinatesYX[],
): string[] => {
  const splitStack = stack.map((row) => row.split(""))
  coordinates.forEach((coord) => {
    const y = coord[0]
    const x = coord[1]
    splitStack[y][x] = "X"
  })

  return splitStack.map((row) => row.join(""))
}

const getNumberOfRollsV2 = (
  row: string,
  rowBefore: string | undefined,
  rowAfter: string | undefined,
  yCoord: number,
): RemovedRolls => {
  let rollsInRow: RemovedRolls = {
    totalRemoved: 0,
    coordinates: [],
  }

  row.split("").forEach((item, currentIndex) => {
    let adjacentRolls = 0
    if (item === "@") {
      if (rowBefore)
        adjacentRolls += checkRowAboveOrBelow(rowBefore, currentIndex)
      if (rowAfter)
        adjacentRolls += checkRowAboveOrBelow(rowAfter, currentIndex)
      adjacentRolls += checkCurrentRow(row, currentIndex)
      if (adjacentRolls < 4) {
        rollsInRow.totalRemoved++
        rollsInRow.coordinates.push([yCoord, currentIndex])
        // pass up an array of coordinates
      }
    }
  })

  return rollsInRow
}

const processWholeStack = (stack: string[]) => {
  let rolls = 0
  stack.forEach((row, i, array) => {
    const rowBefore = array[i - 1]
    const rowAfter = array[i + 1]
    rolls += getNumberOfRolls(row, rowBefore, rowAfter)
  })
  return rolls
}

const getNumberOfRolls = (
  row: string,
  rowBefore: string | undefined,
  rowAfter: string | undefined,
): number => {
  let rollsInRow = 0

  row.split("").forEach((item, currentIndex) => {
    let adjacentRolls = 0
    if (item === "@") {
      if (rowBefore)
        adjacentRolls += checkRowAboveOrBelow(rowBefore, currentIndex)
      if (rowAfter)
        adjacentRolls += checkRowAboveOrBelow(rowAfter, currentIndex)
      adjacentRolls += checkCurrentRow(row, currentIndex)
      if (adjacentRolls < 4) {
        rollsInRow++
        // pass up an array of coordinates
      }
    }
  })
  return rollsInRow
}

const checkRowAboveOrBelow = (row: string, currentIndex: number): number => {
  let count = 0
  if (row[currentIndex] === "@") {
    count++
  }
  if (row[currentIndex - 1] === "@") {
    count++
  }
  if (row[currentIndex + 1] === "@") {
    count++
  }
  return count
}

const checkCurrentRow = (row: string, currentIndex: number): number => {
  let count = 0
  if (row[currentIndex - 1] === "@") {
    count++
  }
  if (row[currentIndex + 1] === "@") {
    count++
  }
  return count
}

run({
  part1: {
    tests: [
      {
        input: testInput1,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput1,
        expected: 43,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
