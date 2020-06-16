import fs from 'fs';
import path from 'path';
import gendiff from '../src/gendiff';
import parser from '../src/parser';

const directoryName = path.join(__dirname, '/../__fixtures__/');
const pathToEqualDataFile = path.join(directoryName, 'result.txt');
const equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('test difference %s with %s', (beforeFileName, afterFileName) => {
  const pathToBefore = path.join(directoryName, beforeFileName);
  const pathToAfter = path.join(directoryName, afterFileName);

  const rawDataBefore = fs.readFileSync(pathToBefore, 'utf-8');
  const rawDataAfter = fs.readFileSync(pathToAfter, 'utf-8');

  const fileTypeBefore = path.extname(pathToBefore).slice(1);
  const fileTypeAfter = path.extname(pathToAfter).slice(1);

  const beforeData = parser(fileTypeBefore, rawDataBefore);
  const afterData = parser(fileTypeAfter, rawDataAfter);

  const diff = gendiff(beforeData, afterData);

  expect(`${diff}\n`).toEqual(equalData);
});
