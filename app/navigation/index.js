import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Navigator from '../services/navigator';

import ForecastContainer from '../forecast/containers/ForecastContainer';

const StackNavigator = createStackNavigator(
  {
    ForecastContainer,
  },
  {
    initialRouteName: 'ForecastContainer',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
);

const NavigatorContainer = createAppContainer(StackNavigator);

const Router = () => (
  <>
    {Platform.OS === 'android' ? (
      <StatusBar backgroundColor="#1f2c4f" />
    ) : (
      <StatusBar backgroundColor="#1f2c4f" barStyle="dark-content" />
    )}
    <NavigatorContainer
      ref={Navigator.setContainer}
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = Navigator.getRouteNameFromState(currentState);
        const prevScreen = Navigator.getRouteNameFromState(prevState);
        if (prevScreen !== currentScreen) {
          console.log(
            `[NAVIGATOR] navigated from ${prevScreen} to ${currentScreen}.`
          );
        }
      }}
    />
  </>
);

export default Router;
