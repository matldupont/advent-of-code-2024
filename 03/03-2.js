const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');

const allMultiplicationsRegex = /(mul\(\d{1,3},\d{1,3}\))/g;
const operandsRegex = /(\d{1,3})/g;

const enabledData = data
  .split('do()')
  .map((d) => {
    return d.split("don't()")[0];
  })
  .join('');

const sum = enabledData
  .match(allMultiplicationsRegex)
  .map((m) => {
    const [a, b] = m.match(operandsRegex);
    return a * b;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(sum);
