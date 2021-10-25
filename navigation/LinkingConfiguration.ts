/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: 'login',
      Projects: {
        screens: {
          My: 'my',
          Other: 'other',
        },
      },
      Root: {
        screens: {
          Control: {
            screens: {
              Control: 'control',
            },
          },
          Projects: {
            screens: {
              My: 'projects/my',
              Other: 'projects/other',
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

export default linking;
