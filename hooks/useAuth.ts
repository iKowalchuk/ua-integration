import { useEffect, useState } from 'react';
import constate from 'constate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY } from '../constants/App';

type AuthState =
  | { type: 'initial' }
  | { type: 'authenticated'; token: string }
  | { type: 'unauthenticated' };

const useAuth = () => {
  const [auth, setAuthState] = useState<AuthState>({
    type: 'initial',
  });

  const getAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      token ? await setAuth(token) : await removeAuth();
    } catch (error) {
      throw new Error(error);
    }
  };

  const setAuth = async (token: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      setAuthState({ type: 'authenticated', token });
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeAuth = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      setAuthState({ type: 'unauthenticated' });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return {
    auth,
    getAuthState,
    setAuth,
    removeAuth,
  } as const;
};

export const [AuthProvider, useAuthContext] = constate(useAuth);
