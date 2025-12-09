import run from "aocrunner"

interface CoordinateMap {
  [distance: number]: string
}

const parseInput = (rawInput: string) => rawInput.split("\n").map(m => m.split(",").map(i => Number(i)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  console.log(input);

  const allDistances: CoordinateMap = {}
  input.forEach((coord, index) => {
    const getOthers = input.filter((_, i) => i > index)
    getOthers.forEach((other, j) => {
      const dis = getDistance(coord, other)
      allDistances[dis] = [index, j].join(":")
    })
  })
  
  console.log(allDistances)

  const smallestDistance = +Object.keys(allDistances).sort((a, b) => +a - +b)[0]
  console.log(smallestDistance);
  console.log(allDistances[smallestDistance]);
  
  

  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const getDistance = (a: number[], b: number[]) => {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2))
}



run({
  part1: {
    tests: [
      {
        input: `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`,
        expected: 40,
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
  onlyTests: true,
})
