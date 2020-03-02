import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhost = Platform.OS === 'ios' ? 'http://localhost:4000/' : 'http://10.0.2.2:4000/';

const environments = {
  dev: {
    POSITION_STACK_KEY: 'e194bcb9355545eabb6306686e371683',
    GOOGLE_MAPS_APIKEY: 'AIzaSyDZbHGS6FS7igu96wVvNWfqbh9sHUG69VE'
  },
  staging: {
    apiUrl: 'https://your-staging-api-url-here.com/'
  },
  prod: {
    apiUrl: 'https://your-prod-api-url-here.com/'
  },
}

// const getEnvVars = (env = Constants.manifest.releaseChannel) => {
//   if (__DEV__) {
//     console.log('Hello');
//     return ENV.dev;
//   } else {
//     // When publishing to production, change this to `ENV.prod` before running an `expo build`
//     return ENV.staging;
//   }
// }

const env = Constants.manifest.releaseChannel || 'dev';

export default {
  ...environments[env]
};