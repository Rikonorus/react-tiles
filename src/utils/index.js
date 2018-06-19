
const getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}
const getPossibleColors = (arrayLength) => {
  const possibleColors = [];
  for (let i = 0; i < arrayLength; i++) {
    possibleColors.push(getRandomColor());
  }
  return possibleColors;
}
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export default { getRandomColor, getPossibleColors, shuffleArray };