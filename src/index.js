import commander from 'commander';
import genDiff from './gendiff';
import render from './formaters/render';
import getPlain from './formaters/plain';

export default (pathToFileBefore, pathToFileAfter) => {
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

  if (pathToFileBefore && pathToFileAfter) {
    const diff = genDiff(pathToFileBefore, pathToFileAfter);
    return diff;
  }

  clihelper.parse(process.argv);

  if (!clihelper.args.length && !pathToFileBefore && !pathToFileAfter) {
    clihelper.help();
  }

  const diff = genDiff(pathToFile1, pathToFile2);

  switch (clihelper.format) {
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

  return false;
};
