import ini from 'ini';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import gendiff from '../src/gendiff';
import render from '../src/formaters/render';
import getPlain from '../src/formaters/plain';

const directoryName = path.join(__dirname, '/../__fixtures__/');
const pathToEqualDataFile = path.join(directoryName, 'result.txt');
const pathToEqualDataPlainFile = path.join(directoryName, 'resultplain.txt');
const equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');
const equalPlainData = fs.readFileSync(pathToEqualDataPlainFile, 'utf-8');

test('gendiff json', () => {
  const pathToFile1 = path.join(directoryName, 'before.json');
  const pathToFile2 = path.join(directoryName, 'after.json');

  const rawData1 = fs.readFileSync(pathToFile1);
  const rawData2 = fs.readFileSync(pathToFile2);

  const data1 = JSON.parse(rawData1);
  const data2 = JSON.parse(rawData2);

  const diff = gendiff(data1, data2);
  const diffToString = render(diff);
  const diffToPlain = getPlain(diff);

  expect(diffToString).toEqual(equalData);
  expect(diffToPlain).toEqual(equalPlainData);
});

test('gendiff yml', () => {
  const pathToFile1 = path.join(directoryName, 'before.yml');
  const pathToFile2 = path.join(directoryName, 'after.yml');

  const rawData1 = fs.readFileSync(pathToFile1);
  const rawData2 = fs.readFileSync(pathToFile2);

  const data1 = yaml.safeLoad(rawData1);
  const data2 = yaml.safeLoad(rawData2);

  const diff = gendiff(data1, data2);
  const diffToString = render(diff);

  const diffToPlain = getPlain(diff);

  expect(diffToString).toEqual(equalData);
  expect(diffToPlain).toEqual(equalPlainData);
});

test('gendiff ini', () => {
  const pathToFile1 = path.join(directoryName, 'before.ini');
  const pathToFile2 = path.join(directoryName, 'after.ini');

  const rawData1 = fs.readFileSync(pathToFile1, 'utf-8');
  const rawData2 = fs.readFileSync(pathToFile2, 'utf-8');

  const data1 = ini.parse(rawData1);
  const data2 = ini.parse(rawData2);

  const diff = gendiff(data1, data2);
  const diffToString = render(diff);
  const diffToPlain = getPlain(diff);

  expect(diffToString).toEqual(equalData);
  expect(diffToPlain).toEqual(equalPlainData);
});
