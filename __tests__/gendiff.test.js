import ini from 'ini';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import gendiff from '../src/gendiff';
import render from '../src/render';

const directoryName = path.join(__dirname, '/../__fixtures__/');

test('gendiff json', () => {
  const pathToFile1 = path.join(directoryName, 'before.json');
  const pathToFile2 = path.join(directoryName, 'after.json');
  const pathToEqualDataFile = path.join(directoryName, 'result.txt');

  const rawData1 = fs.readFileSync(pathToFile1);
  const rawData2 = fs.readFileSync(pathToFile2);

  const data1 = JSON.parse(rawData1);
  const data2 = JSON.parse(rawData2);

  const equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');
  const diff = gendiff(data1, data2);
  const diffToString = render(diff);


  expect(diffToString).toEqual(equalData);
});

test('gendiff yml', () => {
  const pathToFile1 = path.join(directoryName, 'before.yml');
  const pathToFile2 = path.join(directoryName, 'after.yml');
  const pathToEqualDataFile = path.join(directoryName, 'result.txt');

  const rawData1 = fs.readFileSync(pathToFile1);
  const rawData2 = fs.readFileSync(pathToFile2);

  const data1 = yaml.safeLoad(rawData1);
  const data2 = yaml.safeLoad(rawData2);

  const equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');
  const diff = gendiff(data1, data2);
  const diffToString = render(diff);

  expect(diffToString).toEqual(equalData);
});

test('gendiff ini', () => {
  const pathToFile1 = path.join(directoryName, 'before.ini');
  const pathToFile2 = path.join(directoryName, 'after.ini');
  const pathToEqualDataFile = path.join(directoryName, 'result.txt');

  const rawData1 = fs.readFileSync(pathToFile1, 'utf-8');
  const rawData2 = fs.readFileSync(pathToFile2, 'utf-8');

  const data1 = ini.parse(rawData1);
  const data2 = ini.parse(rawData2);

  const equalData = fs.readFileSync(pathToEqualDataFile, 'utf-8');
  const diff = gendiff(data1, data2);
  const diffToString = render(diff);

  expect(diffToString).toEqual(equalData);
});
