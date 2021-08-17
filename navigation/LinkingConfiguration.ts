/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: 'login',
      Root: {
        screens: {
          Projects: {
            screens: {
              Projects: 'projects'
            }
          },
          Settings: {
            screens: {
              Settings: 'settings'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
