import types from './types';

export function startForecast() {
  return { type: types.START };
}

export const getForecastLocation = (lat, lon) => (dispatch) => {
  dispatch({
    type: types.WEATHER,
    lat,
    lon,
    payload: {
      request: {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ce11f7c9b5e8dfad7880cb1d24b4c7c3`,
        method: 'GET',
      },
    },
  });
};

export const updateForecastLocation = (lat, lon) => (dispatch) => {
  dispatch({
    type: types.UPDATE_WEATHER,
    payload: {
      request: {
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ce11f7c9b5e8dfad7880cb1d24b4c7c3`,
        method: 'GET',
      },
    },
  });
};

export const getCity = (lat, lon) => (dispatch) => {
  dispatch({
    type: types.GET_CITY,
    payload: {
      request: {
        url: `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18&addressdetails=1`,
        method: 'GET',
      },
    },
  });
};
