import gendiff from '../src/gendiff';

test('gendiff', () => {
  const data1 = { car: 'blue' };
  const data2 = { car: 'green', bus: 'black' };
  const equal = {
    '+ bus': 'black',
    '+ car': 'blue',
    '- car': 'blue',
  };
  expect(gendiff({}, {})).toEqual({});
  expect(gendiff(data1, data2)).toEqual(equal);
});
