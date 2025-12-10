import run from "aocrunner"

interface CoordinateMap {
  [distance: number]: string
}

type PointIndex = string

interface Circuit {
  [circuitName: string]: PointIndex[]
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((m) => m.split(",").map((i) => Number(i)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  // console.log(input)

  const allDistances: CoordinateMap = {}
  input.forEach((coord, index) => {
    const getOthers = input.filter((_, i) => i > index)
    getOthers.forEach((other, j) => {
      const dis = getDistance(coord, other)
      allDistances[dis] = [index, j + index + 1].join(":")
    })
  })

  const sortedDistances = Object.keys(allDistances).sort((a, b) => +a - +b)

  const circuits: Circuit = {}
  let circuitCount = 0
  let currentIndex = 0
  let indexesToSearch = 1000

  const getKeyOfOtherOne = (
    index: string,
    existingKeys: string[],
    circuit: Circuit,
  ): string => {
    // console.log("Looking for other circuits with ", index, existingKeys)

    for (const key of existingKeys) {
      const currentCir = circuit[key]
      if (currentCir.includes(index)) {
        return key
      }
      // console.log(`Current circuit ${currentCir} does not include ${index}`);
    }
    return ""
  }

  while (currentIndex < indexesToSearch) {
    const i = currentIndex
    const distance = +sortedDistances[i]
    const coords = allDistances[distance]

    console.log(`Index ${i}, coords: ${allDistances[distance]}`)

    const existingCircuits = Object.keys(circuits)
    if (existingCircuits.length === 0) {
      circuits[`circuit${circuitCount}`] = [...coords.split(":")]
      circuitCount++
    } else {
      // checking for existing keys
      const [ind1, ind2] = coords.split(":")
      let circuitsChanged = false
      for (const cirKey of existingCircuits) {
        const currentCir = circuits[cirKey]
        if (currentCir.includes(ind1) && currentCir.includes(ind2)) {
          // console.log(`Both ${ind1} and ${ind2} are in a circuit`)

          circuitsChanged = true
          // indexesToSearch++
          break
        } else if (currentCir.includes(ind1)) {
          // console.log(
          //   `The first, ${ind1}, is in a circuit. Pushing ${ind2} to ${cirKey}`,
          // )
          currentCir.push(ind2)
          // find circuits where second key exists, if any, and COMBINE them and delete the other one.
          // find the key of the other one
          const otherCircuitKey = getKeyOfOtherOne(
            ind2,
            existingCircuits.filter((k) => k !== cirKey),
            circuits,
          )
          // console.log(otherCircuitKey);

          if (otherCircuitKey) {
            // combine them
            circuits[cirKey] = [
              ...currentCir,
              ...circuits[otherCircuitKey],
            ].filter((f, i, array) => array.indexOf(f) === i)
            // delete key
            delete circuits[otherCircuitKey]
          } else {
            circuits[cirKey] = currentCir
          }
          circuitsChanged = true
          break
        } else if (currentCir.includes(ind2)) {
          // console.log(
          //   `The second, ${ind2}, is in a circuit. Pushing ${ind1} to ${cirKey}`,
          // )
          currentCir.push(ind1)
          const otherCircuitKey = getKeyOfOtherOne(
            ind1,
            existingCircuits.filter((k) => k !== cirKey),
            circuits,
          )
          // console.log(otherCircuitKey);

          if (otherCircuitKey) {
            // combine them
            circuits[cirKey] = [
              ...currentCir,
              ...circuits[otherCircuitKey],
            ].filter((f, i, array) => array.indexOf(f) === i)
            // delete key
            delete circuits[otherCircuitKey]
          } else {
            circuits[cirKey] = currentCir
          }
          circuitsChanged = true
          break
        }
      }
      if (!circuitsChanged) {
        // console.log(
        //   `Neither ${ind1} nor ${ind2} are in an existing circuit. Creating "circuit${circuitCount}"`,
        // )

        circuits[`circuit${circuitCount}`] = [...coords.split(":")]
        circuitCount++
      }
    }
    currentIndex++
    console.log(circuits)
  }

  // console.log(circuits);

  // sort keys (distances) by size (smallest to largest)
  // put each index of the coordinates into an array.
  // find the next smallest, and check the first array to see if any index is in there.
  // if one of them is, add the other. If both are, do nothing. If neither are, they get their own array
  // count the total in each array that gets created
  // while times iterated < indexesToSearch

  // find the top three keys with highest amount
  // get all the keys
  // for each key get the length, and push into an array with "[length]:[keyname]"
  // sor that array by length, and get the keynames for the top three

  const allKeys = Object.keys(circuits)
  const lengthKeyPairs = allKeys.map((keyName) => {
    const length = circuits[keyName].length
    return `${length}:${keyName}`
  })
  lengthKeyPairs.sort((a, b) => +b.split(":")[0] - +a.split(":")[0])
  // console.log(lengthKeyPairs)
  const [one, two, three] = lengthKeyPairs

  return +one.split(":")[0] * +two.split(":")[0] * +three.split(":")[0]
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

const getDistance = (a: number[], b: number[]) => {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2) +
      Math.pow(a[2] - b[2], 2),
  )
}

run({
  part1: {
    tests: [
      // {
      //   input: `162,817,812
      // 57,618,57
      // 906,360,560
      // 592,479,940
      // 352,342,300
      // 466,668,158
      // 542,29,236
      // 431,825,988
      // 739,650,466
      // 52,470,668
      // 216,146,977
      // 819,987,18
      // 117,168,530
      // 805,96,715
      // 346,949,466
      // 970,615,88
      // 941,993,340
      // 862,61,35
      // 984,92,344
      // 425,690,689`,
      //   expected: 40,
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
