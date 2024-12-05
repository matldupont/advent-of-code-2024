const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const dataset = data.trim().split('\n');

const isCenterInBounds = (x, y) => {
  return (
    y > 0 &&
    y < dataset.length - 1 &&
    x > 0 &&
    x < dataset[0].length - 1
  );
};
const isTopDownMatch = (x, y) => {
  if (!isCenterInBounds(x, y)) return false;

  return (
    (dataset[y - 1][x - 1] === 'M' &&
      dataset[y + 1][x + 1] === 'S') ||
    (dataset[y - 1][x - 1] === 'S' && dataset[y + 1][x + 1] === 'M')
  );
};

const isBottomUpMatch = (x, y) => {
  if (!isCenterInBounds(x, y)) return false;

  return (
    (dataset[y + 1][x - 1] === 'M' &&
      dataset[y - 1][x + 1] === 'S') ||
    (dataset[y + 1][x - 1] === 'S' && dataset[y - 1][x + 1] === 'M')
  );
};

const evaluateNeighborhood = (x, y) => {
  return isTopDownMatch(x, y) && isBottomUpMatch(x, y);
};

const processDataset = () => {
  const processedDataset = dataset.reduce((datasetTotal, line, y) => {
    return (
      datasetTotal +
      line.split('').reduce((lineTotal, ch, x) => {
        const isMatch =
          ch === 'A' ? evaluateNeighborhood(x, y) : false;

        return lineTotal + (isMatch ? 1 : 0);
      }, 0)
    );
  }, 0);

  return processedDataset;
};

console.log(processDataset());
