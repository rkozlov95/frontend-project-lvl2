import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import format from './formaters/index.js';

const convertFileToObject = (pathToFile) => {
  const rawData = fs.readFileSync(pathToFile, 'utf-8');
  const type = path.extname(pathToFile).slice(1);
  return parse(type, rawData);
};

const genDiff = (pathToFile1, pathToFile2, mode = 'stylish') => {
  const obj1 = convertFileToObject(pathToFile1);
  const obj2 = convertFileToObject(pathToFile2);
  const tree = buildTree(obj1, obj2);
  return format(tree, mode.toLowerCase());
};

export default genDiff;
