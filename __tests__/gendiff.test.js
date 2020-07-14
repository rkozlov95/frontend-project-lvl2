import fs from 'fs';
import path from 'path';
import { genDiff, getPlain, render } from '../src/index';

let equalData;
let equalDataPlain;
let equalFormatedData;
const directoryName = path.join(__dirname, '/../__fixtures__/');
const pathToEqualDataFile = path.join(directoryName, 'default.txt');
const pathToEqualDataPlain = path.join(directoryName, 'plain-result.txt');
const pathToEqualFormatedData = path.join(directoryName, 'result.txt');

beforeAll(() => {
  equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');
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

  const diff = genDiff(pathToBefore, pathToAfter);
  const plainDiff = getPlain(JSON.parse(diff));
  const formatedDiff = render(JSON.parse(diff));

  expect(diff).toEqual(equalData.trim());
  expect(plainDiff).toEqual(equalDataPlain.trim());
  expect(formatedDiff.trim()).toEqual(equalFormatedData.trim());
});
