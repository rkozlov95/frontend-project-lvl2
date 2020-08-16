import _ from 'lodash';

const startBracket = '{';
const endBracket = '}';

const getIndent = (depth) => ' '.repeat(depth * 4);

const convert = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const indent = getIndent(depth);
  const result = _.flatMap(value, (item, key) => `${indent}    ${key}: ${item}`);
  return [startBracket, ...result, `${indent}${endBracket}`].join('\n');
};

const mapping = {
  updated: (key, value, indent, beforeValue) => [
    `${indent}  - ${key}: ${beforeValue}`,
    `${indent}  + ${key}: ${value}`,
  ],
  removed: (key, value, indent, beforeValue) => `${indent}  - ${key}: ${beforeValue}`,
  added: (key, value, indent) => `${indent}  + ${key}: ${value}`,
  unchanged: (key, value, indent) => `${indent}    ${key}: ${value}`,
};

const getStylish = (ast) => {
  const iter = (tree, depth) => {
    const indent = getIndent(depth);
    const result = _.flatMap(tree, (node) => {
      const {
        key, children, type, beforeValue, value,
      } = node;
      if (children) {
        const childrenIndent = getIndent(depth + 1);
        const childrenStylish = iter(children, depth + 1);
        return `${childrenIndent}${key}: ${childrenStylish}`;
      }
      const convertedValue = convert(value, depth + 1);
      const convertedBeforeValue = convert(beforeValue, depth + 1);
      return mapping[type](key, convertedValue, indent, convertedBeforeValue);
    });
    return [startBracket, ...result, `${indent}${endBracket}`].join('\n');
  };
  return iter(ast, 0);
};

export default getStylish;
