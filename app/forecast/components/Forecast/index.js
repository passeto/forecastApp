import React from 'react';
import { View, Title, Spinner, Button } from 'native-base';
import { Image, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardWeather from '../CardWeather';
import styles from './styles';

const Forecast = (props) => {
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
    lat,
    lon,
    isLoadingUpdate,
    isLoadingCity,
  } = props;

  if (dataDaily !== undefined) {
    dataDaily.shift();
  }

  return (
    <LinearGradient
      colors={['#212e52', '#1f2c4f', '#4c669f']}
      style={{ flex: 1 }}
    >
      {isLoading || isLoadingCity ? (
        <View style={styles.containerLoading}>
          <Spinner size="large" color="#fff" />
          <Title style={{ opacity: 0.65 }}>Loading...</Title>
        </View>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              small
              onPress={() => updateForecast(lat, lon)}
            >
              {isLoadingUpdate ? (
                <Spinner large color="#fff" />
              ) : (
                <Text style={styles.textUpdate}>Update</Text>
              )}
            </Button>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.titleCity}>
              {city}, {state}
            </Text>
            <Title style={styles.font}>
              {`${dailyWeek},` +
                ` ${monthDay}` +
                ' ' +
                `${monthName} ` +
                `${year}`}
            </Title>
            <Title style={styles.font}>{hour}</Title>
          </View>
          <View style={styles.weatherContainer}>
            <Title style={styles.font}>{weatherDescription}</Title>
            <Image
              style={styles.img}
              source={{
                uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
              }}
            />
            <Title style={styles.temperature}>{`${celsius}°C`} </Title>
          </View>
          <ScrollView horizontal style={styles.scroll}>
            {dataDaily
              ? dataDaily.map((item, index) => (
                  <CardWeather key={index} data={item} />
                ))
              : null}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Updated {updatedAt}</Text>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

export default Forecast;
