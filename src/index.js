import path from 'path';
import commander from 'commander';
import fs from 'fs';
import genDiff from './gendiff';
import parser from './parser';
// import render from './render';

export default () => {
  const clihelper = commander;
  let pathToFile1;
  let pathToFile2;

  clihelper
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      pathToFile1 = firstConfig;
      pathToFile2 = secondConfig;
    });

  clihelper.parse(process.argv);

  if (!clihelper.args.length) clihelper.help();

  const rawData1 = fs.readFileSync(pathToFile1, 'utf-8');
  const rawData2 = fs.readFileSync(pathToFile2, 'utf-8');
  const type1 = path.extname(pathToFile1);
  const type2 = path.extname(pathToFile2);

  const data1 = parser(type1.slice(1), rawData1);
  const data2 = parser(type2.slice(1), rawData2);

  const result = genDiff(data1, data2);

  console.log(result);
};
