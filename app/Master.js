import React from 'react';
import { Container } from 'native-base';
import { Provider } from 'react-redux';
import store from './store';

import Router from './navigation';

const Master = () => {
  return (
    <Provider store={store}>
      <Container>
        <Router />
      </Container>
    </Provider>
  );
};

export default Master;
