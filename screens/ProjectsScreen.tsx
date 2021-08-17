import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import getProjects, { Project } from '../api/getProjects';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjectsRequest();
  }, []);

  const getProjectsRequest = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
