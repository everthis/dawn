/*
 * flatten array
 * usage:
 * flatten([[1, 2, 3], [4, 5]]); // [1, 2, 3, 4, 5]
 * flatten([[[1, [1.1]], 2, 3], [4, 5]]); // [1, 1.1, 2, 3, 4, 5]
 */
export default function flatten (arr) {
  return arr.reduce((flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), [])
}
