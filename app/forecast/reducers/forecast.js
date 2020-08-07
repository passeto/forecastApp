import moment from 'moment';
import types from '../types';

const INITIAL_STATE = {
  start_forecast: 'Hello world!!',
  dataWeather: '',
  address: '',
  updatedAt: '',
  isLoading: true,
  isLoadingUpdate: false,
  isLoadingCity: true,
  lat: '',
  lon: '',
};

function reducer(state = INITIAL_STATE, { type, ...action }) {
  const { payload } = action;

  if (types.START === type) {
    return {
      ...state,
    };
  }
  if (types.WEATHER_SUCCESS === type) {
    return {
      ...state,
      dataDaily: payload.data.daily,
      dt: payload.data.current.dt,
      isLoading: false,
      lat: payload.data.lat,
      lon: payload.data.lon,
      updatedAt: moment().format('DD/MM/YYYY HH:mm:ss'),
    };
  }

  if (types.WEATHER_FAIL === type) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (types.UPDATE_WEATHER_SUCCESS === type) {
    return {
      ...state,
      dataDaily: payload.data.daily,
      dt: payload.data.current.dt,
      isLoadingUpdate: payload.data.isLoadingUpdate,
      updatedAt: moment().format('DD/MM/YYYY HH:mm:ss'),
    };
  }

  if (types.UPDDATE_WEATHER_FAIL === type) {
    return {
      ...state,
      isLoadingUpdate: false,
    };
  }

  if (types.GET_CITY_SUCCESS === type) {
    return {
      ...state,
      address: payload.data.address,
      isLoadingCity: false,
    };
  }

  if (types.GET_CITY_FAIL === type) {
    return {
      ...state,
      isLoadingCity: false,
    };
  }
  return state;
}

export default reducer;
