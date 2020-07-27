import {
  has, reduce, isObject, keys, union,
} from 'lodash';

import fs from 'fs';
import path from 'path';
import parser from './parser';
import getStylish from './formaters/stylish';
import getPlain from './formaters/plain';

const readFile = (pathToFile) => {
  const rawData = fs.readFileSync(pathToFile, 'utf-8');
  const type = path.extname(pathToFile).slice(1);
  return parser(type, rawData);
};

const actions = [
  {
    type: 'nested',
    check: (key, obj1, obj2) => isObject(obj1[key]) && isObject(obj2[key]),
    process: (key, type, value, beforeValue, f) => ({ key, type, children: f(beforeValue, value) }),
  },
  {
    type: 'added',
    check: (key, obj1) => !has(obj1, key),
    process: (key, type, value) => ({ key, type, value }),
  },
  {
    type: 'removed',
    check: (key, obj1, obj2) => !has(obj2, key),
    process: (key, type, value, beforeValue) => ({ key, type, beforeValue }),
  },
  {
    type: 'updated',
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    process: (key, type, value, beforeValue) => ({
      key, type, value, beforeValue,
    }),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    process: (key, type, value) => ({ key, type, value }),
  },
];

const getAst = (obj1, obj2) => {
  const commonKeys = union(keys(obj1), keys(obj2));
  const result = reduce(commonKeys.sort(), (acc, key) => {
    const { type, process } = actions.find(({ check }) => check(key, obj1, obj2));
    return [
      ...acc,
      process(key, type, obj2[key], obj1[key], getAst),
    ];
  }, []);
  return result;
};

const formaters = {
  plain: getPlain,
  json: JSON.stringify,
  default: getStylish,
};

const genDiff = (pathToFile1, pathToFile2, mode) => {
  const obj1 = readFile(pathToFile1);
  const obj2 = readFile(pathToFile2);
  const ast = getAst(obj1, obj2);
  return formaters[mode || 'default'](ast);
};

export default genDiff;
