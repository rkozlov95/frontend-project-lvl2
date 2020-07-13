#!/usr/bin/env node

import commander from 'commander';
import { genDiff, render, getPlain } from '..';

let pathToFile1;
let pathToFile2;

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    pathToFile1 = firstConfig;
    pathToFile2 = secondConfig;
  });

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}

const diff = genDiff(pathToFile1, pathToFile2);

switch (commander.format) {
  case 'plain': {
    const result = getPlain(JSON.parse(diff));
    console.log(result);
    break;
  }
  case 'json': {
    const result = JSON.stringify(JSON.parse(diff));
    console.log(result);
    break;
  }
  default:
    console.log(render(JSON.parse(diff)));
    break;
}
