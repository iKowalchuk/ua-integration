import * as React from 'react';
import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthStackParamList } from '../types';
import { useAuthContext } from '../hooks/useAuth';
import login from '../api/login';

export default function LoginScreen({ navigation }: StackScreenProps<AuthStackParamList, 'Login'>) {
  const { setAuth } = useAuthContext();

  const [formData, setFormData] = React.useState<{ login: string; password: string }>({
    login: 'admin',
    password: 'Passw0rd'
  });
  const [isSubmit, setIsSubmit] = React.useState(false);

  const handleLogin = async () => {
    setIsSubmit(true);

    if (formData.login && formData.password) {
      const { token } = await login({ login: formData.login, password: formData.password });
      setAuth(token);
    }
  };

  return (
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
            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Login
            </FormControl.Label>
            <Input
              value={formData.login}
              onChangeText={(value) => setFormData({ ...formData, login: value })}
            />
            <FormControl.ErrorMessage>Login is required</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={isSubmit && !formData.password}>
            <FormControl.Label _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}>
              Password
            </FormControl.Label>
            <Input
              type="password"
              value={formData.password}
              onChangeText={(value) => setFormData({ ...formData, password: value })}
            />
            <FormControl.ErrorMessage>Password is required</FormControl.ErrorMessage>
          </FormControl>

          <Button mt={5} colorScheme="cyan" _text={{ color: 'white' }} onPress={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
