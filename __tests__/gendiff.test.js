import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const encoding = 'utf-8';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getPathToFile = (fileName) => path.join(__dirname, '/../__fixtures__/', fileName);

const readFile = (fileName) => fs.readFileSync(getPathToFile(fileName), encoding).trim();

describe('test gendiff', () => {
  const equalDataJson = readFile('json-result.txt');
  const equalDataPlain = readFile('plain-result.txt');
  const equalFormatedData = readFile('stylish-result.txt');

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
