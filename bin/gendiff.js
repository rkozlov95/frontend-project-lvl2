#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../src/index.js';

commander
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, commander.format));
  })
  .parse(process.argv);
