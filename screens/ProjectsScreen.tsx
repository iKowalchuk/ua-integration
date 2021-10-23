import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Heading, FlatList } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useProjectsContext } from '../hooks/useProjects';
import getProjects, { Project } from '../api/getProjects';
import { useAuthContext } from '../hooks/useAuth';

import { RootTabScreenProps } from '../types';

const Projects = ({ navigation }: RootTabScreenProps<'Projects'>) => {
  const { removeAuth } = useAuthContext();
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
    await setProject(project);
    await removeAuth();
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

  if (projectTokens.length === 0) {
    return (
      <FlatList
        data={projects}
        renderItem={({ item }) => (
          <Button mx="4" mb="2" onPress={() => handleClick(item)}>
            {item.descr}
          </Button>
        )}
        keyExtractor={item => item.descr + item.id}
      />
    );
  }

  const authProjectsComponent = () => (
    <FlatList
      mt="5"
      data={authProjects}
      renderItem={({ item }) => (
        <Button mx="4" mb="2" onPress={() => handleClick(item)}>
          {item.descr}
        </Button>
      )}
      keyExtractor={item => item.descr + item.id}
    />
  );

  const noAuthProjectsComponent = () => (
    <FlatList
      mt="5"
      data={noAuthProjects}
      renderItem={({ item }) => (
        <Button mx="4" mb="2" onPress={() => handleClick(item)}>
          {item.descr}
        </Button>
      )}
      keyExtractor={item => item.descr + item.id}
    />
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="My" component={authProjectsComponent} />
      <Tab.Screen name="Other" component={noAuthProjectsComponent} />
    </Tab.Navigator>
  );
};

const ProjectsScreen = (props: RootTabScreenProps<'Projects'>) => {
  const { auth } = useAuthContext();

  if (auth.type === 'authenticated') {
    return <Projects {...props} />;
  }

  return (
    <Box safeArea flex="1">
      <Box p="4">
        <Heading size="lg" color="primary.500">
          Projects
        </Heading>
        <Heading color="muted.400" size="xs">
          Select to continue!
        </Heading>
      </Box>
      <Projects {...props} />
    </Box>
  );
};

export default ProjectsScreen;
