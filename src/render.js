import { map } from 'lodash';

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
    default:
      return false;
  }
};

const getIndent = (count) => ' '.repeat(count);

const render = (tree, indent = 4) => {
  const result = map(tree, (item) => {
    const {
      key, value, status, children,
    } = item;

    if (children) {
      return `${getIndent(indent)}${item.key}: {\n${children.map((n) => render(n, indent + 4))}`;
    }

    if (typeof value === 'object') {
      const [childKey, childValue] = Object.entries(value)[0];
      const first = `${getIndent(indent)}${key}: {\n`;
      let temp = first.split('');
      temp[indent - 2] = check(status);
      temp = temp.join('');
      const elem = `${temp}${getIndent(indent + 4)}${childKey}: ${childValue}`;
      const closeBrace = `${getIndent(indent)}}`;
      return `${elem}\n${closeBrace}`;
    }

    const line = `${getIndent(indent)}${item.key}: ${item.value}`;
    const temp = line.split('');
    temp[indent - 2] = check(status);
    return temp.join('');
  });

  return result.join('\n');
};

export default (tree) => `{\n${render(tree)}\n}\n`;
