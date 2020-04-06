import { has, reduce, forEach, sortBy } from 'lodash';

const genDiff = (obj1, obj2) => {
  const result = reduce(obj2, (acc, value, key) => {
    if (typeof value === 'object' && typeof obj1[key] === 'object') {
      const element = { key, children: [genDiff(obj1[key], value)] };
      return [...acc, element];
    }
    let status;

    if (!has(obj1, key)) {
      status = 'added';
    } else if (obj1[key] !== obj2[key]) {
      status = 'changed';
      const element1 = { key, value, status };
      const element2 = { key, value, status: 'removed'};
      return [...acc, element1, element2];
    } else {
      status = 'unchanged';
    }

    const element = { key, value, status };
    return [...acc, element];
  }, []);

  forEach(obj1, (value, key) => {
    if (!has(obj2, key)) {
      result.push({ key, value, status: 'removed'});
    }
  });

  return sortBy(result, [(element) => element.key]);
};

export default genDiff;

