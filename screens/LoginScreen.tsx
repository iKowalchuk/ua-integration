import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { AuthStackParamList } from '../types';
import { useAuthContext } from '../hooks/useAuth';
import login from '../api/login';

export default function LoginScreen({ navigation }: StackScreenProps<AuthStackParamList, 'Login'>) {
  const { setAuth } = useAuthContext();

  const handleLogin = async () => {
    const { token } = await login({ login: 'admin', password: 'Passw0rd' });
    setAuth(token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.link}>
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>
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
  link: {
    marginTop: 15,
    paddingVertical: 15
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
