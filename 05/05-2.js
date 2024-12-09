const fs = require('fs');

const data = fs.readFileSync('data.txt', 'utf8');
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

const getFailingRules = (update, rules) => {
  return rules.filter((rule) => !rulePasses(rule, update));
};

const processUpdates = (updates, rules) => {
  const failingUpdates = updates
    .filter((update) => !updatePasses(update, rules))
    .map((update) => {
      let failingRules = getFailingRules(update, rules);
      console.log('ORIGINAL FAILING RULES', failingRules);
      while (failingRules.length > 0) {
        update = fixErrors(update, failingRules[0]);
        console.log('UPDATED UPDATE', update);
        failingRules = getFailingRules(update, rules);
        console.log('NEW FAILING RULES', failingRules);
      }
      return update;
    });

  // const fixedUpdates = failingUpdates.map((update) =>
  //   fixErrors(update, rule)
  // );

  console.log('failingUpdates', failingUpdates);

  return failingUpdates;
};

const fixErrors = (failedUpdate, failingRule) => {
  console.log('fix', failedUpdate, failingRule);

  const [firstPageRule, secondPageRule] = failingRule;

  const firstPageIndex = failedUpdate.indexOf(firstPageRule);
  const secondPageIndex = failedUpdate.indexOf(secondPageRule);

  failedUpdate[firstPageIndex] = secondPageRule;
  failedUpdate[secondPageIndex] = firstPageRule;

  console.log('PAGE AFTER', failedUpdate);

  return failedUpdate;
};

const processMiddle = (processedUpdates) => {
  return processedUpdates.reduce((acc, u) => {
    const middle = Math.floor(u.length / 2);

    return acc + parseInt(u[middle]);
  }, 0);
};

console.log(processMiddle(processUpdates(updates, rules)));
