import 'react-native-get-random-values';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { ProjectsProvider } from './hooks/useProjects';
import { AuthProvider } from './hooks/useAuth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import './i18n';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const config = {
    useSystemColorMode: false,
    initialColorMode: colorScheme,
  };

  const customTheme = extendTheme({ config });

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={customTheme}>
        <ProjectsProvider>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </AuthProvider>
        </ProjectsProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
