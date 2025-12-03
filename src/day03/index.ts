import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n")

const testInput1 = `987654321111111
811111111111119
234234234234278
818181911112111`

const testInput2 = "3332221732222313632231112123312334132423312333223376521312228322222132232231322233613312223323133232"

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let joltage = 0
  input.forEach(bank => {
    const batteries = bank.split("").map(bat => +bat)
    let highestNumber = 0
    let index = 0
    batteries.forEach((bat, i, array) => {
      const length = array.length
      if (bat > highestNumber && i !== length - 1) {
        highestNumber = bat
        index = i
      }
    })
    const restOfTheArray = batteries.splice((index || 0) + 1)
    const nextHighest = restOfTheArray.sort((a, b) => b - a)[0]
    joltage += Number([highestNumber, nextHighest].join(""))
  })
  return joltage
}

const part2 = (rawInput: string) => {
  const input = parseInput(testInput1)
  let joltage = 0
  input.forEach(bank => {
    joltage += getMaxJoltage(bank)
  })

  return joltage
}

const getMaxJoltage = (bank: string): number => {
  const batteries = bank.split("").map(bat => +bat)
  const batteriesOn: number[] = []
  for (let i = 12; i > 0; i--) {
    let highestNumber = 0
    batteries.forEach((bat, index, array) => {
      const length = array.length
      if (bat > highestNumber && index < length - i) {
        highestNumber = bat
      }
    })
    batteriesOn.push(highestNumber)
  }
  console.log("Highest numbers:", batteriesOn);
  
  const totalSum = batteriesOn.reduce((acc, curr) => curr + acc, 0)
  return totalSum
}

run({
  part1: {
    tests: [
      {
        input: testInput1,
        expected: 357,
      },
      {
        input: testInput2,
        expected: 86
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput1,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
