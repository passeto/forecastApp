import React from 'react';
import Forecast from '../../components/Forecast';

const ForecastScreen = (props) => {
  const {
    isLoading,
    city,
    state,
    dailyWeek,
    monthDay,
    monthName,
    year,
    hour,
    icon,
    weatherDescription,
    celsius,
    dataDaily,
    updatedAt,
    updateForecast,
    isLoadingUpdate,
    isLoadingCity,
    lat,
    lon,
  } = props;

  return (
    <Forecast
      isLoading={isLoading}
      city={city}
      state={state}
      dailyWeek={dailyWeek}
      monthDay={monthDay}
      monthName={monthName}
      year={year}
      hour={hour}
      weatherDescription={weatherDescription}
      icon={icon}
      celsius={celsius}
      dataDaily={dataDaily}
      updatedAt={updatedAt}
      updateForecast={updateForecast}
      lat={lat}
      lon={lon}
      isLoadingUpdate={isLoadingUpdate}
      isLoadingCity={isLoadingCity}
    />
  );
};

export default ForecastScreen;
