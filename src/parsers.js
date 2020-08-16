import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const repair = (obj) => (
  _.mapValues(obj, (value) => {
    const newValue = (/^\d+$/.test(value))
      ? _.toNumber(value)
      : value;
    return (_.isObject(value))
      ? repair(value)
      : newValue;
  })
);

const parsers = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: (data) => repair(ini.parse(data)),
};

export default (type, data) => {
  if (!parsers[type]) {
    throw new Error('file type not supported');
  }
  return parsers[type](data);
};
