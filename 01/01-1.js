const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.trim().split('\n');

const array1 = [];
const array2 = [];

lines.forEach((line) => {
  const [num1, num2] = line.split('   ').map(Number);

  // Insert num1 into array1 using insertion sort
  let i = array1.length - 1;
  while (i >= 0 && array1[i] > num1) {
    array1[i + 1] = array1[i];
    i--;
  }
  array1[i + 1] = num1;

  // Insert num2 into array2 using insertion sort
  let j = array2.length - 1;
  while (j >= 0 && array2[j] > num2) {
    array2[j + 1] = array2[j];
    j--;
  }
  array2[j + 1] = num2;
});

const distance = array1.reduce((distance, current, idx) => {
  return distance + Math.abs(current - array2[idx]);
}, 0);

console.log(distance);
