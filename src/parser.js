import yaml from 'js-yaml';
import ini from 'ini';

const mapping = {
  yml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse
};

export default (type, data) => mapping[type](data);
