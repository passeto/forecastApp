import { types, async } from '../utils/type-creator';

export default types(
  [
    ...async('WEATHER'),
    ...async('GET_CITY'),
    ...async('UPDATE_WEATHER'),
    'START',
  ],
  'FORECAST'
);
