import React from 'react';
import { Image } from 'react-native';
import { View, Title, Body } from 'native-base';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import kelvinToCelsius from '../../../utils/kelvin-to-celsius';

import styles from './styles';

const CardWeather = (props) => {
  const { data } = props;
  const { weather, temp } = data;
  const { min, max } = temp;
  const nameWeek = data ? moment.unix(data.dt).format('ddd') : '';
  const tempMin = data ? kelvinToCelsius(min) : 0;
  const tempMax = data ? kelvinToCelsius(max) : 0;
  return (
    <View style={styles.card}>
      <LinearGradient
        colors={['#212e52', '#1f2c4f', '#4c669f']}
        style={styles.gradient}
      >
        <Body style={styles.body}>
          <Title>{nameWeek}</Title>
          <View style={styles.content}>
            <Title style={styles.contentTitle}>{weather[0].main}</Title>
            <Image
              style={styles.imgCard}
              source={{
                uri: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
              }}
            />
          </View>
          <View style={styles.footer}>
            <Title>{tempMax}°</Title>
            <Title style={styles.tempMin}>{tempMin}°</Title>
          </View>
        </Body>
      </LinearGradient>
    </View>
  );
};

export default CardWeather;
