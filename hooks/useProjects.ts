import { useEffect, useState } from 'react';
import constate from 'constate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROJECT_KEY, PROJECT_TOKENS_KEY } from '../constants/App';
import { Project } from '../api/getProjects';

type ProjectToken = { projectId: number; token: string };

const useProjects = () => {
  const [project, setProjectState] = useState<Project | null>(null);
  const [projectTokens, setProjectTokensState] = useState<ProjectToken[]>([]);

  const getProjectState = async () => {
    try {
      const projectData = await AsyncStorage.getItem(PROJECT_KEY);
      projectData ? await setProject(JSON.parse(projectData)) : await removeProject();
    } catch (error) {
      throw new Error(error);
    }
  };

  const setProject = async (data: Project) => {
    try {
      await AsyncStorage.setItem(PROJECT_KEY, JSON.stringify(data));
      setProjectState(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeProject = async () => {
    try {
      await AsyncStorage.removeItem(PROJECT_KEY);
      setProjectState(null);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getProjectTokensState = async () => {
    try {
      const projectTokensData = await AsyncStorage.getItem(PROJECT_TOKENS_KEY);
      projectTokensData
        ? await setProjectTokens(JSON.parse(projectTokensData))
        : await removeProjectTokens();
    } catch (error) {
      throw new Error(error);
    }
  };

  const setProjectTokens = async (data: ProjectToken[]) => {
    try {
      await AsyncStorage.setItem(PROJECT_TOKENS_KEY, JSON.stringify(data));
      setProjectTokensState(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeProjectTokens = async () => {
    try {
      await AsyncStorage.removeItem(PROJECT_TOKENS_KEY);
      setProjectTokensState([]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const setProjectToken = async (token: string) => {
    try {
      const projectId = project?.id;

      if (!projectId) {
        return;
      }

      const filteredProjectTokens = projectTokens.filter(
        (projectToken) => projectToken.projectId !== projectId
      );

      const data: ProjectToken = { projectId, token };
      await AsyncStorage.setItem(
        PROJECT_TOKENS_KEY,
        JSON.stringify([...filteredProjectTokens, data])
      );
      setProjectTokensState([...filteredProjectTokens, data]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeProjectToken = async () => {
    try {
      const projectId = project?.id;

      if (!projectId) {
        return;
      }

      const filteredProjectTokens = projectTokens.filter(
        (projectToken) => projectToken.projectId !== projectId
      );
      await AsyncStorage.setItem(PROJECT_TOKENS_KEY, JSON.stringify(filteredProjectTokens));
      setProjectTokensState(filteredProjectTokens);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getProjectState();
    getProjectTokensState();
  }, []);

  return {
    project,
    setProject,
    removeProject,
    projectTokens,
    setProjectToken,
    removeProjectToken,
  } as const;
};

export const [ProjectsProvider, useProjectsContext] = constate(useProjects);
