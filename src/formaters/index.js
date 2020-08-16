import getStylish from './stylish.js';
import getPlain from './plain.js';

const formaters = {
  plain: getPlain,
  json: JSON.stringify,
  stylish: getStylish,
};

export default (tree, mode) => {
  if (!formaters[mode]) {
    throw new Error('formater does not exist');
  }
  return formaters[mode](tree);
};
