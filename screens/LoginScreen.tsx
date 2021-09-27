import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  KeyboardAvoidingView,
  useToast,
  VStack,
} from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Platform } from 'react-native';

import { AuthStackParamList } from '../types';
import { useAuthContext } from '../hooks/useAuth';
import login from '../api/login';

const LoginScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Login'>) => {
  const { setAuth } = useAuthContext();
  const toast = useToast();

  const [formData, setFormData] = useState<{ login: string; password: string }>({
    login: '',
    password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsSubmit(true);

    if (!formData.login && !formData.password) {
      return;
    }

    try {
      setIsLoading(true);
      const { token } = await login({ login: formData.login, password: formData.password });
      setAuth(token);
    } catch {
      toast.show({
        title: 'Incorrect username or password.',
        status: 'error',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center safeArea flex={1}>
        <Box p={2} w="90%">
          <Heading size="lg" color="primary.500">
            Welcome
          </Heading>
          <Heading color="muted.400" size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={2} mt={5}>
            <FormControl isInvalid={isSubmit && !formData.login}>
              <FormControl.Label _text={{ fontSize: 'sm', fontWeight: 600 }}>
                Login
              </FormControl.Label>
              <Input
                size="xl"
                value={formData.login}
                onChangeText={(value) => setFormData({ ...formData, login: value })}
              />
              <FormControl.ErrorMessage>Login is required</FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isSubmit && !formData.password}>
              <FormControl.Label _text={{ fontSize: 'sm', fontWeight: 600 }}>
                Password
              </FormControl.Label>
              <Input
                size="xl"
                type="password"
                value={formData.password}
                onChangeText={(value) => setFormData({ ...formData, password: value })}
              />
              <FormControl.ErrorMessage>Password is required</FormControl.ErrorMessage>
            </FormControl>

            <Button
              mt={5}
              colorScheme="cyan"
              _text={{ color: 'white' }}
              onPress={handleLogin}
              isLoading={isLoading}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
