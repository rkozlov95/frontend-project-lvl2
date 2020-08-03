import { mapValues, isObject, toNumber } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const repair = (obj) => (
  mapValues(obj, (value) => {
    const newValue = (/^\d+$/.test(value))
      ? toNumber(value)
      : value;
    return (isObject(value))
      ? repair(value)
      : newValue;
  })
);

const mapping = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: (data) => repair(ini.parse(data)),
};

export default (type, data) => mapping[type](data);
