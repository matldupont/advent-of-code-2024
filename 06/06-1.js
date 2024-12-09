const fs = require('fs');

const data = fs.readFileSync('test.txt', 'utf8');
const rows = data
  .trim()
  .split('\n')
  .map((row) => row.split(''));

const getStartPosition = () => {
  for (let row = 0; row < rows.length; row++) {
    const currentRow = rows[row];
    const guardIndex = currentRow.indexOf('^');
    if (guardIndex !== -1) {
      return { x: guardIndex, y: row };
    }
  }
};

const switchDirection = (direction) => {
  return (direction + 1) % 4;
};

const getNextPosition = (currentPosition, direction) => {
  switch (direction) {
    case 0:
      return { x: currentPosition.x, y: currentPosition.y - 1 };
    case 1:
      return { x: currentPosition.x + 1, y: currentPosition.y };
    case 2:
      return { x: currentPosition.x, y: currentPosition.y + 1 };
    case 3:
      return { x: currentPosition.x - 1, y: currentPosition.y };
  }
};

const getDirectionChar = (direction, currentChar) => {
  if (
    (currentChar === '-' && direction % 2 === 0) ||
    (currentChar === '|' && direction % 2 === 1)
  ) {
    return '+';
  }
  return direction % 2 === 0 ? '|' : '-';
};

const isOutOfBounds = (position) => {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= rows[0].length ||
    position.y >= rows.length
  );
};

const processPath = () => {
  let currentPosition = getStartPosition();
  let direction = 0;
  let count = 1;

  let nextChar = rows[currentPosition.y][currentPosition.x];
  let inBounds = true;
  while (nextChar !== 'undefined') {
    let nextPosition = getNextPosition(currentPosition, direction);

    if (isOutOfBounds(nextPosition)) {
      break;
    }

    nextChar = rows[nextPosition.y][nextPosition.x];
    console.log(
      'nextChar',
      getDirectionChar(direction),
      nextChar,
      nextPosition
    );

    if (
      (direction % 2 === 0 && nextChar === '-') ||
      (direction % 2 === 1 && nextChar === '|')
    ) {
      console.log('Hit perpendicular', currentPosition);
      rows[currentPosition.y][currentPosition.x] = '+';
    }

    if (nextChar === '#') {
      direction = switchDirection(direction);
      rows[currentPosition.y][currentPosition.x] = '+';
      currentPosition = getNextPosition(currentPosition, direction);
      nextChar = rows[currentPosition.y][currentPosition.x];
      count++;
    } else {
      if (nextChar !== '+') {
        rows[currentPosition.y][currentPosition.x] = getDirectionChar(
          direction,
          rows[currentPosition.y][currentPosition.x]
        );
      }

      if (nextChar === '.') {
        count++;
      }
      currentPosition = nextPosition;
    }
  }

  console.log(rows.map((row) => row.join('')).join('\n'));
  console.log('Count', count);
};

processPath();
