const countRanges = (ranges: string[]): number => {
  let count = 0
  const newRanges: number[] = []
  const sortedRanges = ranges.sort((a, b) => {
    const [lowerA] = a.split("-")
    const [lowerB] = b.split("-")
    return +lowerA - +lowerB
  })
  
  return count
}