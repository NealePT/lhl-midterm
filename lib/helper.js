// Receives an integer and returns a random number from 0 to that integer.
const generateRandomNum = integer => {
  return Math.round(Math.random() * integer);
}
exports.generateRandomNum = generateRandomNum;

// Receives an array and returns a new array that contains four unique indexes from the receiving array as it's elements.
const getRandomArrayIndexes = (array, indexCount) => {
  const newArray = [];
  let index;
  while (newArray.length < indexCount) {
    let index = generateRandomNum(array.length - 1);
    let status = false;
    for (const e of newArray) {
      if (e === index) {
        status = true;
      }
    }
    status ? null : newArray.push(index);
  }
  return newArray;
}
exports.getRandomArrayIndexes = getRandomArrayIndexes;
