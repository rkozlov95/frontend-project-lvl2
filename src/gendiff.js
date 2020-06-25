import {
  has, reduce, forEach, sortBy,
} from 'lodash';

import fs from 'fs';
import path from 'path';
import parser from './parser';

const readFile = (pathToFile) => {
  const rawData = fs.readFileSync(pathToFile, 'utf-8');
  const type = path.extname(pathToFile).slice(1);
  const data = parser(type, rawData);
  return data;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const objData1 = readFile(pathToFile1);
  const objData2 = readFile(pathToFile2);

  const iter = (obj1, obj2) => {
    const result = reduce(obj2, (acc, value, key) => {
      if (typeof value === 'object' && typeof obj1[key] === 'object') {
        const element = { key, children: [iter(obj1[key], value)] };
        return [...acc, element];
      }

      if (!has(obj1, key)) {
        const element = { key, value, status: 'added' };
        return [...acc, element];
      }

      if (obj1[key] !== obj2[key]) {
        const element1 = { key, value, status: 'changed' };
        const element2 = { key, value: obj1[key], status: 'removed' };
        return [...acc, element1, element2];
      }

      const element = { key, value, status: 'unchanged' };
      return [...acc, element];
    }, []);

    forEach(obj1, (value, key) => {
      if (!has(obj2, key)) {
        result.push({ key, value, status: 'removed' });
      }
    });

    return sortBy(result, [(element) => element.key]);
  };

  return iter(objData1, objData2);
};

export default (obj1, obj2) => JSON.stringify(genDiff(obj1, obj2), null, 2);
