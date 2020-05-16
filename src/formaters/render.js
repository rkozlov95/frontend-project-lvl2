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

const getSpaces = (count) => ' '.repeat(count);

const render = (tree, spacesCount = 4) => {
  const result = map(tree, (item) => {
    const {
      key, value, status, children,
    } = item;

    if (children) {
      const firstLineChildren = `${getSpaces(spacesCount)}${item.key}: {\n`;
      const mappedChildren = children.map((n) => render(n, spacesCount + 4));
      return `${firstLineChildren}${mappedChildren}`;
    }

    if (typeof value === 'object') {
      const [childKey, childValue] = Object.entries(value)[0];
      const spaces = getSpaces(spacesCount).split('');
      spaces[spacesCount - 2] = check(status);

      const firstLine = `${spaces.join('')}${key}: {\n`;
      const element = `${getSpaces(spacesCount + 4)}${childKey}: ${childValue}\n`;
      const lastLine = `${getSpaces(spacesCount)}}`;
      return `${firstLine}${element}${lastLine}`;
    }

    const spaces = getSpaces(spacesCount).split('');
    spaces[spacesCount - 2] = check(status);

    const line = `${spaces.join('')}${item.key}: ${item.value}`;
    return line;
  });

  return result.join('\n');
};

export default (tree) => `{\n${render(tree)}\n}\n`;
