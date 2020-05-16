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
      const firstLineChildren = `${getIndent(indent)}${item.key}: {\n`;
      const mappedChildren = children.map((n) => render(n, indent + 4));
      return `${firstLineChildren}${mappedChildren}`;
    }

    if (typeof value === 'object') {
      const [childKey, childValue] = Object.entries(value)[0];
      const parts = getIndent(indent).split('');
      parts[indent - 2] = check(status);
      const firstLine = `${parts.join('')}${key}: {\n`;

      const elem = `${firstLine}${getIndent(indent + 4)}${childKey}: ${childValue}`;
      const closeBrace = `${getIndent(indent)}}`;
      return `${elem}\n${closeBrace}`;
    }

    const parts = getIndent(indent).split('');
    parts[indent - 2] = check(status);

    const line = `${parts.join('')}${item.key}: ${item.value}`;
    return line;
  });

  return result.join('\n');
};

export default (tree) => `{\n${render(tree)}\n}\n`;
