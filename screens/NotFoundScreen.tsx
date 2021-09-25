import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Center, Heading } from 'native-base';

import { RootStackParamList } from '../types';

const NotFoundScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'NotFound'>) => {
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
