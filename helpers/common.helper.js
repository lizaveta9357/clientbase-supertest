const shiftToNext = (str, shift) => {
  if (str === "f".repeat(24)) return "0".repeat(24)

  let first = str.slice(0, 13)
  let second = str.slice(13)

  // console.log({ str, shift, first, second })

  let num = parseInt(second, 16) + shift
  let num16 = num.toString(16)

  return first + num16
}
// console.log("RESULT = " + shiftToNext("5b73a34187e56a003ad5313f", 1))

// const shiftToNext = (str) => {
//   const hexa = "0123456789abcdef"
//   let arr = str.split("")
//   let last = arr.pop()
//   let newIndex
//   for (let i = 0; i < hexa.length; i++) {
//     if (hexa[i] === last) {
//       let newIndex = (hexa.indexOf(last) + 1) % hexa.length
//       arr.push(hexa[newIndex])
//     }
//   }
//   return arr.join("")
// }

export { shiftToNext }
