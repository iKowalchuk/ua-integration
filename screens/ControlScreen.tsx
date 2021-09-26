import React, { useEffect, useMemo, useState } from 'react';
import { Button, Center, Heading, SectionList } from 'native-base';

import { useAuthContext } from '../hooks/useAuth';
import getMenu, { Menu } from '../api/getMenu';
import runCommand from '../api/runCommand';

const ControlScreen = () => {
  const { auth } = useAuthContext();

  const [menu, setMenu] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRunCommand, setIsRunCommand] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getMenuRequest();
  }, []);

  const getMenuRequest = async () => {
    if (auth.type !== 'authenticated') {
      return;
    }

    try {
      setIsLoading(true);
      const data = await getMenu({ token: auth.token });
      setMenu(data);
    } finally {
      setIsLoading(false);
    }
  };

  const sectionMenu = useMemo(() => {
    return Object.entries(
      menu.reduce(
        (acc: { [key: string]: Menu[] }, { nameGroup, ...other }) =>
          Object.assign(acc, {
            [nameGroup]: [...(acc[nameGroup] || []), { nameGroup, ...other }],
          }),
        {}
      )
    ).map(([key, value]) => ({ title: key, data: value }));
  }, [menu]);

  const handleClick = async (command: string) => {
    if (auth.type !== 'authenticated') {
      return;
    }

    try {
      setIsRunCommand({ ...isRunCommand, [command]: true });
      await runCommand({ token: auth.token, command });
    } finally {
      setIsRunCommand({ ...isRunCommand, [command]: false });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <SectionList
      backgroundColor="light.50"
      sections={sectionMenu}
      renderItem={({ item }) => (
        <Button
          mx={4}
          mb={2}
          onPress={() => handleClick(item.pCmdIn)}
          isLoading={isRunCommand[item.pCmdIn]}
        >
          {item.descr}
        </Button>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Center backgroundColor="light.50">
          <Heading fontSize="xl" mt="5" mb={4}>
            {title}
          </Heading>
        </Center>
      )}
      keyExtractor={(item) => item.pCmdIn}
    />
  );
};

export default ControlScreen;