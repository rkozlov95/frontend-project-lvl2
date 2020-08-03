import fs from 'fs';
import path from 'path';
import genDiff from '../src/index';

const encoding = 'utf-8';

const getPathToFile = (fileName) => path.join(__dirname, '/../__fixtures__/', fileName);

const readFile = (pathToFile) => fs.readFileSync(pathToFile, encoding).trim();

const pathToEqualDataJson = getPathToFile('json-result.txt');
const pathToEqualDataPlain = getPathToFile('plain-result.txt');
const pathToEqualFormatedData = getPathToFile('stylish-result.txt');

describe('test gendiff', () => {
  const equalDataJson = readFile(pathToEqualDataJson);
  const equalDataPlain = readFile(pathToEqualDataPlain);
  const equalFormatedData = readFile(pathToEqualFormatedData);

  test.each([
    ['before.json', 'after.json'],
    ['before.yml', 'after.yml'],
    ['before.ini', 'after.ini'],
  ])('test difference %s with %s', (beforeFileName, afterFileName) => {
    const pathToBefore = getPathToFile(beforeFileName);
    const pathToAfter = getPathToFile(afterFileName);

    const formatedDiff = genDiff(pathToBefore, pathToAfter);
    const plainDiff = genDiff(pathToBefore, pathToAfter, 'plain');
    const jsonDiff = genDiff(pathToBefore, pathToAfter, 'json');

    expect(jsonDiff).toEqual(equalDataJson);
    expect(plainDiff).toEqual(equalDataPlain);
    expect(formatedDiff).toEqual(equalFormatedData);
  });
});
