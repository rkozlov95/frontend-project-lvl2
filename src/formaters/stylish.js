import { flatMap, isObject } from 'lodash';

const startBracket = '{';
const endBracket = '}';

const getIndent = (depth) => ' '.repeat(depth * 4);

const convert = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }
  const indent = getIndent(depth);
  const result = flatMap(value, (item, key) => `${indent}    ${key}: ${item}`);
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
    const result = flatMap(tree, (node) => {
      const {
        key, children, type, beforeValue, value,
      } = node;
      return (children)
        ? `${getIndent(depth + 1)}${key}: ${iter(children, depth + 1)}`
        : mapping[type](key, convert(value, depth + 1), indent, convert(beforeValue, depth + 1));
    });
    return [startBracket, ...result, `${indent}${endBracket}`].join('\n');
  };
  return iter(ast, 0);
};

export default getStylish;
