import run from "aocrunner"

const testInput1 = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `

type Operation = "*" | "+"

interface Problem {
  numbers: number[]
  operation: Operation
}

const parseInput = (rawInput: string) => {
  const rows = rawInput.split('\n').map(m => m.split(" ").filter(f => !!f))
  // console.log(rows);

  const problems = rows[0].map((col, i, row) => {
    const rawColumns: string[] = []
    for (let j = 0; j < rows.length; j++) {
      rawColumns.push(rows[j][i])
    }
    return {
      numbers: rawColumns.filter((_, i) => i < rows.length - 1).map(m => +m),
      operation: rawColumns[rawColumns.length - 1]
    } as Problem
  })
  return problems
}

const parseInputV2 = (rawInput: string) => {
  const rows = rawInput.split('\n').map(m => m.split("").reverse().join(""))
  // console.log(rows);

  return rows

  // reverse the string
  // get length of string
  // iterate throught the string, each index place at a time
  // if all the characters at the index are " ", then push the numbers (exclude the operator).

  //reverse the order of the number
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  // console.log(input);

  const total = input.reduce((acc, curr) => {
    switch (curr.operation) {
      case "*":
        return multiplyAll(curr.numbers) + acc
      case "+":
        return addAll(curr.numbers) + acc
    }
  }, 0)

  return total
}

const part2 = (rawInput: string) => {
  const input = parseInputV2(rawInput)
  const problems: Problem[] = []

  const length = input[0].length

  let numberSet: number[] = []
  for (let i = 0; i < length - 1; i++) {
    const number = getNumberAtIndex(input.filter((_, i) => i < input.length - 1), i)
    if (number) {
      numberSet.push(number)
    }
  }

  console.log(problems);


  return
}

const getNumberAtIndex = (input: string[], index: number) => {
  let number = ""
  console.log(input);

  input.forEach(row => {
    number += row[index]
  })
  console.log(number);
  
  return number ? +number : 0
}

const multiplyAll = (nums: number[]) => nums.reduce((acc, curr) => acc * curr)
const addAll = (nums: number[]) => nums.reduce((acc, curr) => acc + curr)

run({
  part1: {
    tests: [
      {
        input: `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `,
        expected: 4277556,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput1,
        expected: 3263827,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})


const n = [
  ['123', '328', '', '51', '64', ''],
  ['', '45', '64', '', '387', '23', ''],
  ['', '', '6', '98', '', '215', '314'],
  ['*', '', '', '+', '', '', '*', '', '', '+']
]