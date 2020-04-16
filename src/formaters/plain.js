import { map, find, sortedUniqBy } from 'lodash';

const check = (status, path, value, key, tree) => {
  switch (status) {
    case 'changed': {
      const before = find(tree, { key, status: 'removed' });
      const beforeValue = (typeof before.value === 'object') ? '[complex value]' : before.value;
      return `Property ${path} was changed from: ${beforeValue} to ${value}`;
    }
    case 'removed':
      return `Property ${path} was deleted`;
    case 'added':
      return `Property ${path} was added with value: ${value}`;
    case 'unchanged':
      return '';
    default:
      return false;
  }
};

const getPlain = (tree, path = []) => {
  const filterTree = sortedUniqBy(tree, (n) => n.key);
  const result = map(filterTree, (item) => {
    const {
      key, value, children, status,
    } = item;

    const fullPath = [...path, key];

    if (children) {
      return children.map((n) => getPlain(n, fullPath));
    }

    if (typeof value === 'object') {
      return check(status, fullPath.join('.'), '[complex value]', key, tree);
    }

    return check(status, fullPath.join('.'), value, key, tree);
  });
  return result.filter((n) => n !== '').join('\n');
};

export default getPlain;
