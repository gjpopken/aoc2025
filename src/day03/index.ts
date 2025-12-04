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
  const input = parseInput(rawInput)
  let joltage = 0
  input.forEach(bank => {
    joltage += getMaxJoltage(bank)
  })

  return joltage
}

const getMaxJoltage = (bank: string): number => {
  console.log(bank);
  
  const batteries = bank.split("").map(bat => +bat)
  let lastIndex = -1
  const batteriesWithIndeces = batteries.map((bat, i) => [bat, i].join(":"))
  const batteriesOn: string[] = []
  for (let i = 12; i > 0; i--) {
    const [lower, upper] = getRange(lastIndex, batteries.length, i)
    const availableBatteries = batteriesWithIndeces.filter((bat, i) => i >= lower && i <= upper)
    const [highestNumber, index] = availableBatteries.sort((a,b) => +b.split(":")[0] - +a.split(":")[0])[0].split(":")
    // console.log(`Bound: [${lower} - ${upper}], availableBatteries: ${availableBatteries}, highestNo+index: [${highestNumber}, ${index}]`);
    
    batteriesOn.push(highestNumber)
    lastIndex = +index
  }

  const wholeNumber = Number(batteriesOn.join(""))
  console.log(wholeNumber);
  
  return wholeNumber
}

const getRange = (lastIndex: number, length: number, i: number): number[] => {
  return [lastIndex + 1, length - i]
}

// correct answer 

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
