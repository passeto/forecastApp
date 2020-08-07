import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { reset } from '../services/navigator';

const DEVELOP_HOST = '';
const PRODUCTION_HOST = 'http://alfred.Domesticasfoods.com:8094/api';
const HOMOLOG_HOST = 'http://dev-alfred.mazzafc.tech/backend/api';

const CURRENT_HOST = DEVELOP_HOST;

const getCurrentHostName = () => {
  switch (CURRENT_HOST) {
    case DEVELOP_HOST: {
      return 'develop';
    }
    case HOMOLOG_HOST: {
      return 'homolog';
    }
    case PRODUCTION_HOST: {
      return 'production';
    }
    default: {
      return 'unknown';
    }
  }
};

export { getCurrentHostName, DEVELOP_HOST, PRODUCTION_HOST, CURRENT_HOST };

export default {
  default: {
    client: axios.create({
      baseURL: CURRENT_HOST,
      responseType: 'json',
    }),
    options: {
      returnRejectedPromiseOnError: true,
      interceptors: {
        request: [
          ({ getState }, config) => {
            // const { auth } = getState().login;
            return {
              ...config,
              headers: {
                ...(config.headers || {}),
                // Authorization: auth.token ? `Bearer ${auth.token}` : undefined,
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
              },
            };
          },
        ],
        response: [
          {
            success: (store, response) => response,
            error: async (store, error) => {
              if (error.response && error.response.status === 401) {
                await AsyncStorage.multiRemove([
                  '@copia-libri/user',
                  '@copia-libri/token',
                ]);
                reset('ForecastContainer');
              }

              return Promise.reject(error);
            },
          },
        ],
      },
    },
  },
};
