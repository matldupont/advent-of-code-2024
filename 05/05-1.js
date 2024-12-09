const fs = require('fs');

const data = fs.readFileSync('test.txt', 'utf8');
const [rulesData, updatesData] = data.trim().split('\n\n');

const rules = rulesData.split('\n').map((rule) => rule.split('|'));

const updates = updatesData
  .split('\n')
  .map((update) => update.split(','));

const rulePasses = (rule, update) => {
  const [firstPageRule, secondPageRule] = rule;

  const firstPageIndex = update.indexOf(firstPageRule);
  const secondPageIndex = update.indexOf(secondPageRule);

  return (
    firstPageIndex === -1 ||
    secondPageIndex === -1 ||
    firstPageIndex < secondPageIndex
  );
};

const updatePasses = (update, rules) =>
  rules.every((rule) => rulePasses(rule, update));

const processUpdates = (updates, rules) => {
  return updates.filter((update) => updatePasses(update, rules));
};

const processMiddle = (processedUpdates) => {
  return processedUpdates.reduce((acc, u) => {
    const middle = Math.floor(u.length / 2);

    return acc + parseInt(u[middle]);
  }, 0);
};

console.log(processMiddle(processUpdates(updates, rules)));
