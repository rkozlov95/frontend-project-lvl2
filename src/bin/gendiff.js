#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

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

console.log(genDiff(pathToFile1, pathToFile2, commander.format));
