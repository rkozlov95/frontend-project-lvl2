import _ from 'lodash';

const mapping = {
  updated: (path, value, beforeValue) => `Property ${path} was updated. From ${beforeValue} to ${value}`,
  removed: (path) => `Property ${path} was removed`,
  added: (path, value) => `Property ${path} was added with value: ${value}`,
  unchanged: () => '',
};

const convert = (value) => (_.isObject(value) ? '[complex value]' : value);

const getPlain = (ast) => {
  const iter = (tree, path) => _.flatMap(tree, (item) => {
    const {
      key, children, type, beforeValue, value,
    } = item;
    const fullPath = [...path, key];
    return (children)
      ? iter(children, fullPath)
      : mapping[type](
        fullPath.join('.'),
        convert(value),
        convert(beforeValue),
      );
  }).filter((x) => x).join('\n');
  return iter(ast, []);
};

export default getPlain;
