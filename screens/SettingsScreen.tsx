import React, { useEffect, useState } from 'react';
import { Avatar, Button, Center, Heading, Text } from 'native-base';

import { useAuthContext } from '../hooks/useAuth';
import getUser, { User } from '../api/getUser';
import logout from '../api/logout';
import { useProjectsContext } from '../hooks/useProjects';

import { RootTabScreenProps } from '../types';

const SettingsScreen = ({ navigation }: RootTabScreenProps<'Settings'>) => {
  const { auth, removeAuth } = useAuthContext();
  const { removeProject, removeProjectToken } = useProjectsContext();

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);

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
      setIsLogout(true);
      await logout({ token: auth.token });
      await removeAuth();
      await removeProject();
      await removeProjectToken();
    } finally {
      setIsLogout(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <Center flex={1}>
      <Avatar bg="green.500" size="xl">
        {user?.descr?.slice(0, 2).toUpperCase() || '-'}
      </Avatar>
      <Center mt={18}>
        <Heading size="md">{user?.descr || '-'}</Heading>
        <Text fontSize="sm">{user?.nameHouse || '-'}</Text>
      </Center>
      <Button variant="outline" onPress={handleLogout} mt={18} isLoading={isLogout}>
        Logout
      </Button>
    </Center>
  );
};

export default SettingsScreen;
