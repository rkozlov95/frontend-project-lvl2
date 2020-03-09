import _ from 'lodash';

export default (obj1, obj2) => {
  const result = _.reduce(obj2, (acc, value, key) => {
    if (_.has(obj1, key)) {
      if (obj1[key] !== value) {
        acc.push(`  + ${key}: ${value}`);
        acc.push(`  - ${key}: ${obj1[key]}`);
        return acc;
      }
    }

    if (!_.has(obj1, key)) {
      acc.push(`  + ${key}: ${value}`);
      return acc;
    }

    acc.push(`  ${key}: ${value}`);
    return acc;
  }, []);

  const entriesObj1 = Object.entries(obj1);

  entriesObj1.forEach((element) => {
    const [key, value] = element;
    if (!_.has(obj2, key)) {
      result.push(`  - ${key}: ${value}`);
    }
  });

  return `{\n${result.join('\n')}\n}\n`;
};
