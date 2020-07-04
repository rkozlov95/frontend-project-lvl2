import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff';

let equalData;
const directoryName = path.join(__dirname, '/../__fixtures__/');
const pathToEqualDataFile = path.join(directoryName, 'result.txt');

beforeAll(() => {
  equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('test difference %s with %s', (beforeFileName, afterFileName) => {
  const pathToBefore = path.join(directoryName, beforeFileName);
  const pathToAfter = path.join(directoryName, afterFileName);

  const diff = gendiff(pathToBefore, pathToAfter);

  expect(diff).toEqual(equalData.trim());
});
