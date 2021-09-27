import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, FlatList } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';

import getProjects, { Project } from '../api/getProjects';
import { AuthStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL_KEY } from '../constants/App';

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

  const handleClick = async (baseURL: string) => {
    await AsyncStorage.setItem(BASE_URL_KEY, baseURL);
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
            <Button mb={2} onPress={() => handleClick(item.urlSite)}>
              {item.descr}
            </Button>
          )}
          keyExtractor={(item) => item.descr + item.id}
        />
      </Box>
    </Box>
  );
};

export default ProjectsScreen;
