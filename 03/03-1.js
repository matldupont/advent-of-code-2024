const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');

const allMultiplicationsRegex = /(mul\(\d{1,3},\d{1,3}\))/g;
const operandsRegex = /(\d{1,3})/g;

const sum = data
  .match(allMultiplicationsRegex)
  .map((m) => {
    const [a, b] = m.match(operandsRegex);
    return a * b;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(sum);
