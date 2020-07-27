import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

let equalDataJson;
let equalDataPlain;
let equalFormatedData;
const directoryName = path.join(__dirname, '/../__fixtures__/');
const pathToEqualDataJson = path.join(directoryName, 'json-result.txt');
const pathToEqualDataPlain = path.join(directoryName, 'plain-result.txt');
const pathToEqualFormatedData = path.join(directoryName, 'stylish-result.txt');

beforeAll(() => {
  equalDataJson = fs.readFileSync(pathToEqualDataJson, 'utf-8');
  equalDataPlain = fs.readFileSync(pathToEqualDataPlain, 'utf-8');
  equalFormatedData = fs.readFileSync(pathToEqualFormatedData, 'utf-8');
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('test difference %s with %s', (beforeFileName, afterFileName) => {
  const pathToBefore = path.join(directoryName, beforeFileName);
  const pathToAfter = path.join(directoryName, afterFileName);

  const formatedDiff = genDiff(pathToBefore, pathToAfter);
  const plainDiff = genDiff(pathToBefore, pathToAfter, 'plain');
  const jsonDiff = genDiff(pathToBefore, pathToAfter, 'json');

  expect(jsonDiff).toEqual(equalDataJson.trim());
  expect(plainDiff).toEqual(equalDataPlain.trim());
  expect(formatedDiff).toEqual(equalFormatedData.trim());
});
