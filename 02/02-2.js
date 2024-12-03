const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
const lines = data.trim().split('\n');

const safe = [];

const isOutsideRange = (diff) => {
  return Math.abs(diff) > 3 || Math.abs(diff) < 1;
};

const isDirectionChanged = (direction, diff) => {
  return (direction > 0 && diff < 0) || (direction < 0 && diff > 0);
};

const isSafe = (report) => {
  let direction;
  let hasRemovedLevel = false;
  let current = report.shift();
  while (current) {
    if (report.length > 0) {
      const next = report[0];
      const diff = current - next;

      if (isOutsideRange(diff)) {
        if (!hasRemovedLevel) {
          // remove level if not already removed
          hasRemovedLevel = true;
          current = report.shift();
          continue;
        }

        return false; // diff is too large or too small
      }

      if (typeof direction === 'undefined') {
        direction = diff > 0 ? 1 : -1; // set direction
      } else {
        if (isDirectionChanged(direction, diff)) {
          if (!hasRemovedLevel) {
            // remove level if not already removed
            hasRemovedLevel = true;
            current = report.shift();
            continue;
          }
          return false; // direction changed: down to up
        }
      }
    }
    current = report.shift();
  }

  return true;
};

lines.forEach((line) => {
  const report = line.split(' ');

  if (isSafe([...report])) {
    safe.push(report);
  }
});

console.log(safe.length);
