import React, { useEffect, useState } from 'react';
import { Box, Button, Heading } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';

import getProjects, { Project } from '../api/getProjects';
import { AuthStackParamList } from '../types';

const ProjectsScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Projects'>) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getProjectsRequest();
  }, []);

  const getProjectsRequest = async () => {
    try {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    navigation.push('Login');
  };

  if (isLoading) {
    return null;
  }

  return (
    <Box safeArea flex="1" p="4">
      <Heading size="lg" color="primary.500">
        Projects
      </Heading>
      <Heading color="muted.400" size="xs">
        Select to continue!
      </Heading>
      <Box mt={5}>
        <FlatList
          data={projects}
          renderItem={({ item }) => (
            <Button my={1} onPress={handleClick}>
              {item.descr}
            </Button>
          )}
        />
      </Box>
    </Box>
  );
};

export default ProjectsScreen;
