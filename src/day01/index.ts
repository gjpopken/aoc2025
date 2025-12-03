import run from "aocrunner"

type CardinalDirection = "L" | "R"

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

const testResult = 6

interface DialDirection {
  direction: CardinalDirection
  distance: number
}

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map((input) => {
    return {
      direction: input[0] as CardinalDirection,
      distance: +input.slice(1),
    } as DialDirection
  })
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let zeroCount = 0
  let currentDialNumber = 50

  input.forEach((dir) => {
    switch (dir.direction) {
      case "L":
        currentDialNumber -= dir.distance
        currentDialNumber = adjustWheel(currentDialNumber)
        break
      case "R":
        currentDialNumber += dir.distance
        currentDialNumber = adjustWheel(currentDialNumber)
        break
    }
    if (currentDialNumber === 0) {
      zeroCount++
    }
  })

  return zeroCount
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let zeroCount = 0
  let startingDialNumber = 50

  input.reduce((acc, dir) => {
    const netMove = calcNetMove(dir, acc)
    const passedZero = calculateTimesPastZero(dir, acc)
    zeroCount += passedZero
    console.log(
      `Dial set to ${netMove}, and passed zero ${passedZero} ${
        passedZero === 1 ? "time" : "times"
      }`,
    )

    return netMove
  }, startingDialNumber)

  return zeroCount
}

const calculateTimesPastZero = (
  dir: DialDirection,
  current: number,
): number => {
  if (dir.direction === "L") {
    console.log(`L:${dir.distance}, from position ${current}`)

    return Math.floor(
      (dir.distance + (100 - (current === 0 ? 100 : current))) / 100,
    )
  } else {
    // console.log(`R:${dir.distance}, from position ${current}`);
    return Math.floor((dir.distance + current) / 100)
  }
}

const calcNetMove = (dir: DialDirection, current: number) => {
  if (dir.direction === "L") {
    return Math.abs((current + 100 - (dir.distance % 100)) % 100)
  } else {
    return Math.abs((current + dir.distance) % 100)
  }
}

const adjustWheel = (currNumber: number) => {
  let adjustNumber = currNumber
  if (adjustNumber > 99) {
    adjustNumber -= 100
    return adjustWheel(adjustNumber)
  } else if (adjustNumber < 0) {
    adjustNumber += 100
    return adjustWheel(adjustNumber)
  } else {
    return adjustNumber
  }
}

run({
  part1: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`,
        expected: testResult,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
