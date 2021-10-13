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
      Projects: 'projects',
      Root: {
        screens: {
          Control: {
            screens: {
              Control: 'control',
            },
          },
          Projects: {
            screens: {
              Projects: {
                screens: {
                  My: 'projects/my',
                  Other: 'projects/other',
                },
              },
            },
          },
          Settings: {
            screens: {
              Settings: 'settings',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
