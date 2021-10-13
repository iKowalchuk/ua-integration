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

  const handleClick = async (command: string) => {
    if (auth.type !== 'authenticated') {
      return;
    }

    try {
      setIsRunCommand((state) => ({ ...state, [command]: true }));
      await runCommand({ token: auth.token, command });
    } finally {
      setIsRunCommand((state) => ({ ...state, [command]: false }));
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

  if (isLoading) {
    return null;
  }

  return (
    <SectionList
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
        <Center>
          <Heading fontSize="xl" mt="5" mb={4}>
            {title}
          </Heading>
        </Center>
      )}
      keyExtractor={(item) => item.pCmdIn}
      stickySectionHeadersEnabled={false}
    />
  );
};

export default ControlScreen;
