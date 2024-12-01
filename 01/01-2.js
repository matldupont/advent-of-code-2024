const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.trim().split('\n');

const array1 = [];

const map2 = new Map();

lines.forEach((line) => {
  const [num1, num2] = line.split('   ').map(Number);
  array1.push(num1);

  if (!map2.has(num2)) {
    map2.set(num2, 0);
  }
  map2.set(num2, map2.get(num2) + 1);
});

const similarity = array1.reduce((sim, num) => {
  return sim + num * (map2.get(num) ?? 0);
}, 0);

console.log(similarity);
