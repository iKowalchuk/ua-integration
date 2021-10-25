import React from 'react';
import { Button, Center, Heading } from 'native-base';
import i18n from 'i18n-js';

import { RootStackScreenProps } from '../types';

const NotFoundScreen = ({ navigation }: RootStackScreenProps<'NotFound'>) => {
  return (
    <Center safeArea flex={1}>
      <Heading size="md">{i18n.t('404.this_screen_doesnt_exist')}</Heading>
      <Button variant="link" onPress={() => navigation.replace('Root')}>
        {i18n.t('404.go_to_home_screen')}
      </Button>
    </Center>
  );
};

export default NotFoundScreen;
