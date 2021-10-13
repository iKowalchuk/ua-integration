import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Heading, FlatList } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useProjectsContext } from '../hooks/useProjects';
import getProjects, { Project } from '../api/getProjects';
import { AuthStackParamList } from '../types';
import { useAuthContext } from '../hooks/useAuth';

const ProjectsScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Projects'>) => {
  const { auth, removeAuth } = useAuthContext();
  const { projectTokens, setProject } = useProjectsContext();

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

  const handleClick = async (project: Project) => {
    await removeAuth();
    await setProject(project);
    navigation.push('Login');
  };

  const authProjects = useMemo(() => {
    return projects.filter(
      project => !!projectTokens.find(item => item.projectId === project.id)?.token
    );
  }, [projects, projectTokens]);

  const noAuthProjects = useMemo(() => {
    return projects.filter(
      project => !projectTokens.find(item => item.projectId === project.id)?.token
    );
  }, [projects, projectTokens]);

  if (isLoading) {
    return null;
  }

  const Tab = createMaterialTopTabNavigator();

  if (auth.type === 'authenticated') {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="My"
          component={() => (
            <Box mt="5">
              <FlatList
                data={authProjects}
                renderItem={({ item }) => (
                  <Button mx={4} mb={2} onPress={() => handleClick(item)}>
                    {item.descr}
                  </Button>
                )}
                keyExtractor={item => item.descr + item.id}
              />
            </Box>
          )}
        />
        <Tab.Screen
          name="Other"
          component={() => (
            <Box mt="5">
              <FlatList
                data={noAuthProjects}
                renderItem={({ item }) => (
                  <Button mx={4} mb={2} onPress={() => handleClick(item)}>
                    {item.descr}
                  </Button>
                )}
                keyExtractor={item => item.descr + item.id}
              />
            </Box>
          )}
        />
      </Tab.Navigator>
    );
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
            <Button mb={2} onPress={() => handleClick(item)}>
              {item.descr}
            </Button>
          )}
          keyExtractor={item => item.descr + item.id}
        />
      </Box>
    </Box>
  );
};

export default ProjectsScreen;
