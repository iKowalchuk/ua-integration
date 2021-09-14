import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extendTheme, NativeBaseProvider } from 'native-base';

import { AuthProvider } from './hooks/useAuth';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  const theme = extendTheme({});

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <AuthProvider>
            <Navigation />
            <StatusBar />
          </AuthProvider>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
