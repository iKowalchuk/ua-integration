import React, { useEffect, useState } from 'react';
import { Avatar, Button, Center, Heading, Text } from 'native-base';

import { useAuthContext } from '../hooks/useAuth';
import getUser, { User } from '../api/getUser';
import logout from '../api/logout';

const SettingsScreen = () => {
  const { auth, removeAuth } = useAuthContext();

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getUserRequest();
  }, []);

  const getUserRequest = async () => {
    if (auth.type !== 'authenticated') {
      return;
    }

    try {
      setIsLoading(true);
      const data = await getUser({ token: auth.token });
      setUser(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (auth.type !== 'authenticated') {
      return;
    }

    try {
      await logout({ token: auth.token });
      await removeAuth();
    } catch {}
  };

  if (isLoading) {
    return null;
  }

  return (
    <Center safeArea flex={1}>
      <Avatar bg="green.500" size="xl">
        {user?.descr[0].toUpperCase() || '-'}
      </Avatar>
      <Center mt={15}>
        <Heading size="md">{user?.descr || '-'}</Heading>
        <Text fontSize="sm">{user?.nameHouse || '-'}</Text>
      </Center>
      <Button variant="outline" onPress={handleLogout} mt={15}>
        Logout
      </Button>
    </Center>
  );
};

export default SettingsScreen;
