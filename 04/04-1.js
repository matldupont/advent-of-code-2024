const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const dataset = data.trim().split('\n');

const isOutOfBounds = (x, y) => {
  return (
    y < 0 ||
    y > dataset.length - 1 ||
    x < 0 ||
    x > dataset[0].length - 1
  );
};

const processSnippet = (snippet, x, y) => {
  if (isOutOfBounds(x, y)) return null;
  const ch = snippet.slice(0, 1);

  if (dataset[y][x] !== ch) return null;

  return snippet.slice(1);
};

const isNorthMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isNorthMatch(rem, x, y - 1);
};

const isNorthEastMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isNorthEastMatch(rem, x + 1, y - 1);
};

const isEastMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isEastMatch(rem, x + 1, y);
};

const isSouthEastMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isSouthEastMatch(rem, x + 1, y + 1);
};

const isSouthMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isSouthMatch(rem, x, y + 1);
};

const isSouthWestMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isSouthWestMatch(rem, x - 1, y + 1);
};

const isWestMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isWestMatch(rem, x - 1, y);
};

const isNorthWestMatch = (snippet, x, y) => {
  const rem = processSnippet(snippet, x, y);
  if (rem === null) return 0;
  return rem?.length === 0 ? 1 : isNorthWestMatch(rem, x - 1, y - 1);
};

const evaluateNeighborhood = (x, y) => {
  return (
    isNorthMatch('XMAS', x, y) +
    isNorthEastMatch('XMAS', x, y) +
    isEastMatch('XMAS', x, y) +
    isSouthEastMatch('XMAS', x, y) +
    isSouthMatch('XMAS', x, y) +
    isSouthWestMatch('XMAS', x, y) +
    isWestMatch('XMAS', x, y) +
    isNorthWestMatch('XMAS', x, y)
  );
};

const processDataset = () => {
  const processedDataset = dataset.reduce((datasetTotal, line, y) => {
    return (
      datasetTotal +
      line.split('').reduce((lineTotal, ch, x) => {
        return lineTotal + evaluateNeighborhood(x, y);
      }, 0)
    );
  }, 0);

  return processedDataset;
};

console.log(processDataset());
