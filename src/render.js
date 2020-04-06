import { map, keys } from 'lodash';

const check = (status) => {
  switch (status) {
    case 'changed':
      return '+';
    case 'removed':
      return '-';
    case 'added':
      return '+';
    case 'unchanged':
      return ' ';
  }
  return false;
};

const render = (tree, indentation = 4) => {
  const result = map(tree, (item) => {
    const { key, value, status, children } = item;
    let line = ' '.repeat(indentation);
    if (children) {
      return `${line}${item.key}\n${children.map((n) => render(n, indentation + 1))}`;
    }
    if (typeof value === 'object') {
      const key1 = keys(value);
      const fff = `${line}${key}: {\n`;
      const elem = fff + `${line}${key1[0]}: ${value[key1[0]]}\n}`;
      return elem;
    }
    return `${line}${item.key}: ${item.value}`;
  });
  return result.join('\n');
};

export default render;
