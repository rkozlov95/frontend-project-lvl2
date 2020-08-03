import {
  has, isObject, keys, union, sortBy,
} from 'lodash';

const actions = [
  {
    type: 'nested',
    check: (key, obj1, obj2) => isObject(obj1[key]) && isObject(obj2[key]),
    process: (key, type, value, beforeValue, f) => ({ key, type, children: f(beforeValue, value) }),
  },
  {
    type: 'added',
    check: (key, obj1) => !has(obj1, key),
    process: (key, type, value) => ({ key, type, value }),
  },
  {
    type: 'removed',
    check: (key, obj1, obj2) => !has(obj2, key),
    process: (key, type, value, beforeValue) => ({ key, type, beforeValue }),
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

const getAst = (obj1, obj2) => {
  const commonKeys = union(keys(obj1), keys(obj2));
  const sortedKeys = sortBy(commonKeys);
  return sortedKeys.map((key) => {
    const { type, process } = actions.find(({ check }) => check(key, obj1, obj2));
    return process(key, type, obj2[key], obj1[key], getAst);
  });
};

export default getAst;
