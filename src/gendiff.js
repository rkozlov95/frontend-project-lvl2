import {
  has, reduce, forEach, sortBy,
} from 'lodash';

const genDiff = (obj1, obj2) => {
  const result = reduce(obj2, (acc, value, key) => {
    if (typeof value === 'object' && typeof obj1[key] === 'object') {
      const element = { key, children: [genDiff(obj1[key], value)] };
      return [...acc, element];
    }

    if (!has(obj1, key)) {
      const element = { key, value, status: 'added' };
      return [...acc, element];
    }

    if (obj1[key] !== obj2[key]) {
      const element1 = { key, value, status: 'changed' };
      const element2 = { key, value: obj1[key], status: 'removed' };
      return [...acc, element1, element2];
    }

    const element = { key, value, status: 'unchanged' };
    return [...acc, element];
  }, []);

  forEach(obj1, (value, key) => {
    if (!has(obj2, key)) {
      result.push({ key, value, status: 'removed' });
    }
  });

  return sortBy(result, [(element) => element.key]);
};

export default genDiff;
