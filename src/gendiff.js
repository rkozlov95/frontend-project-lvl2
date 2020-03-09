import _ from 'lodash';

export default (obj1, obj2) => {
  const result = _.reduce(obj2, (acc, value, key) => {
    if (_.has(obj1, key)) {
      if (obj1[key] !== value) {
        acc[`- ${key}`] = value;
        acc[`+ ${key}`] = obj1[key];
        return acc;
      }
    }
    if (!_.has(obj1, key)) {
      acc[`+ ${key}`] = value;
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

  const entriesObj1 = Object.entries(obj1);

  entriesObj1.forEach((element) => {
    const [key, value] = element;
    if (!_.has(result, key)) {
      result[`- ${key}`] = value;
    }
  });

  return result;
};
