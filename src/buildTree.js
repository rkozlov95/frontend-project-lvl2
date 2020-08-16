import _ from 'lodash';

const actions = [
  {
    type: 'added',
    check: (key, obj1) => !_.has(obj1, key),
    process: (key, type, value) => ({ key, type, value }),
  },
  {
    type: 'removed',
    check: (key, obj1, obj2) => !_.has(obj2, key),
    process: (key, type, value, beforeValue) => ({ key, type, beforeValue }),
  },
  {
    type: 'nested',
    check: (key, obj1, obj2) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (key, type, value, beforeValue, f) => ({ key, type, children: f(beforeValue, value) }),
  },
  {
    type: 'updated',
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    process: (key, type, value, beforeValue) => ({
      key, type, value, beforeValue,
    }),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    process: (key, type, value) => ({ key, type, value }),
  },
];

const buildTree = (obj1, obj2) => {
  const commonKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(commonKeys);
  return sortedKeys.map((key) => {
    const { type, process } = actions.find(({ check }) => check(key, obj1, obj2));
    return process(key, type, obj2[key], obj1[key], buildTree);
  });
};

export default buildTree;
