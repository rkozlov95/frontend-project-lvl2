import commander from 'commander';
import fs from 'fs';
import genDiff from './gendiff';

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

  const rawData1 = fs.readFileSync(pathToFile1);
  const rawData2 = fs.readFileSync(pathToFile2);
  const data1 = JSON.parse(rawData1);
  const data2 = JSON.parse(rawData2);

  const res = genDiff(data1, data2);
  console.log(res);
};
