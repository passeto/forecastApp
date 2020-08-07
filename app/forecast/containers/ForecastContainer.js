import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import ForecastScreen from '../screens/ForecastScreen';
import kelvinToCelsius from '../../utils/kelvin-to-celsius';
import * as actions from '../actions';

const ForecastContainer = (props) => {
  const {
    dataDaily,
    isLoading,
    address,
    updatedAt,
    getForecastLocation,
    lat,
    lon,
    updateForecastLocation,
    isLoadingUpdate,
    isLoadingCity,
  } = props;
  const { city, state } = address;
  useEffect(() => {
    Geolocation.getCurrentPosition(
      async (position) => {
        await getForecastLocation(
          position.coords.latitude,
          position.coords.longitude
        );
        await props.getCity(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      () => {
        Alert.alert(
          'Erro ao acessar localização',
          'Certifique-se de que a função "Local" no seu dispositivo está ativada. Caso contrário, não será possível acessar os dados necessários.'
        );
      }
    );
  }, []);

  const nameWeek = dataDaily ? moment.unix(dataDaily[0].dt).format('dddd') : '';
  const monthDay = dataDaily ? moment.unix(dataDaily[0].dt).format('DD') : '';
  const monthName = dataDaily ? moment.unix(dataDaily[0].dt).format('MMM') : '';
  const year = dataDaily ? moment.unix(dataDaily[0].dt).format('YYYY') : '';
  const hour = moment().format('LT');
  const weatherDescription = dataDaily ? dataDaily[0].weather[0].main : '';
  const icon = dataDaily ? dataDaily[0].weather[0].icon : '';
  const celsius = dataDaily ? kelvinToCelsius(dataDaily[0].temp.day) : 0;

  return (
    <ForecastScreen
      isLoading={isLoading}
      city={city}
      state={state}
      dailyWeek={nameWeek}
      monthDay={monthDay}
      monthName={monthName}
      year={year}
      hour={hour}
      weatherDescription={weatherDescription}
      icon={icon}
      celsius={celsius}
      dataDaily={dataDaily}
      updatedAt={updatedAt}
      updateForecast={updateForecastLocation}
      lat={lat}
      lon={lon}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingCity={isLoadingCity}
    />
  );
};

const mapStateToProps = (state) => ({
  dataDaily: state.forecast.dataDaily,
  address: state.forecast.address,
  updatedAt: state.forecast.updatedAt,
  lat: state.forecast.lat,
  lon: state.forecast.lon,
  isLoading: state.forecast.isLoading,
  isLoadingUpdate: state.forecast.isLoadingUpdate,
  isLoadingCity: state.forecast.isLoadingCity,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer);
