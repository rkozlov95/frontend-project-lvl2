import fs from 'fs';
import path from 'path';
import parser from './parser';
import getAst from './ast';
import getPretty from './formaters';

const convertFileToObject = (pathToFile) => {
  const rawData = fs.readFileSync(pathToFile, 'utf-8');
  const type = path.extname(pathToFile).slice(1);
  return parser(type, rawData);
};

const genDiff = (pathToFile1, pathToFile2, mode = 'stylish') => {
  const obj1 = convertFileToObject(pathToFile1);
  const obj2 = convertFileToObject(pathToFile2);
  const ast = getAst(obj1, obj2);
  return getPretty(ast, mode);
};

export default genDiff;
