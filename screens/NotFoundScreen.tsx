import React from 'react';
import { Button, Center, Heading } from 'native-base';

import { RootStackScreenProps } from '../types';

const NotFoundScreen = ({ navigation }: RootStackScreenProps<'NotFound'>) => {
  return (
    <Center safeArea flex={1}>
      <Heading size="md">This screen doesn't exist.</Heading>
      <Button variant="link" onPress={() => navigation.replace('Root')}>
        Go to home screen!
      </Button>
    </Center>
  );
};

export default NotFoundScreen;
