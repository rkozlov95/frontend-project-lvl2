import getStylish from './stylish';
import getPlain from './plain';

const formaters = {
  plain: getPlain,
  json: JSON.stringify,
  stylish: getStylish,
};

const getPretty = (ast, mode) => formaters[mode](ast);

export default getPretty;
