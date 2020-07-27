import { reduce, isObject, toNumber } from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const repair = (obj) => (
  reduce(obj, (acc, value, key) => {
    const item = (/^\d+$/.test(value))
      ? ({ [key]: toNumber(value) })
      : ({ [key]: value });
    return (isObject(value))
      ? ({ ...acc, [key]: repair(value) })
      : ({ ...acc, ...item });
  }, {})
);

const mapping = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: (data) => repair(ini.parse(data)),
};

export default (type, data) => mapping[type](data);
