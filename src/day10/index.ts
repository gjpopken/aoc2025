import run from "aocrunner"

type Button = number[]

interface ElfInitialisation {
  requirement: string,
  buttons: Button[],
  currentLights: string
}

const parseInput = (rawInput: string): ElfInitialisation[] => rawInput.split("\n").map(line => {
  const splitLine = line.split(" ")
  const requirement = splitLine.filter(item => item[0] === "[")[0].split("").filter(f => f !== "[" && f !== "]").join("")
  const buttons = splitLine.filter(item => item[0] === "(").map(convertToButton)
  // console.log(requirement, buttons);
  
  return {
    requirement,
    buttons,
    currentLights: requirement.split("").map(() => ".").join("")
  } as ElfInitialisation
})

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  console.log(input);
  // starting with the first button, must make decisions


  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const convertToButton = (oldButton: string): Button => {
  return oldButton.split("").filter(f => f !== "(" && f !== ")").join("").split(",").map(m => +m)
}

run({
  part1: {
    tests: [
      {
        input: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`,
        expected: 7,
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
