import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  Spinner,
  useToast,
  VStack,
} from 'native-base';
import { Platform } from 'react-native';
import i18n from 'i18n-js';

import { useAuthContext } from '../hooks/useAuth';
import login from '../api/login';
import { useProjectsContext } from '../hooks/useProjects';

import { RootStackScreenProps } from '../types';

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const { setAuth } = useAuthContext();
  const { project, projectTokens, setProjectToken } = useProjectsContext();
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
      setProjectToken(token);
    } catch {
      toast.show({
        title: i18n.t('login.incorrect_username_or_password_error'),
        status: 'error',
        placement: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const token = useMemo(() => {
    return projectTokens?.find(item => item.projectId === project?.id)?.token;
  }, [projectTokens, project]);

  useEffect(() => {
    if (!project) {
      navigation.push('Projects');
      return;
    }

    if (token) {
      setAuth(token);
    }
  }, []);

  if (token) {
    return (
      <Center flex={1} px="3">
        <HStack space={2} alignItems="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading color="primary.500" fontSize="md">
            {i18n.t('login.loading_label')}
          </Heading>
        </HStack>
      </Center>
    );
  }

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Center flex={1}>
        <Box p={2} w="90%">
          <Heading size="lg" color="primary.500">
            {i18n.t('login.welcome_title')}
          </Heading>
          <Heading color="muted.400" size="xs">
            {i18n.t('login.sign_in_to_continue_subtitle')}
          </Heading>
          <VStack space={2} mt={5}>
            <FormControl isInvalid={isSubmit && !formData.login}>
              <FormControl.Label _text={{ fontSize: 'sm', fontWeight: 600 }}>
                {i18n.t('login.login_label')}
              </FormControl.Label>
              <Input
                size="xl"
                value={formData.login}
                onChangeText={value => setFormData({ ...formData, login: value })}
              />
              <FormControl.ErrorMessage>
                {i18n.t('login.login_is_required_error')}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={isSubmit && !formData.password}>
              <FormControl.Label _text={{ fontSize: 'sm', fontWeight: 600 }}>
                {i18n.t('login.password_label')}
              </FormControl.Label>
              <Input
                size="xl"
                type="password"
                value={formData.password}
                onChangeText={value => setFormData({ ...formData, password: value })}
              />
              <FormControl.ErrorMessage>
                {i18n.t('login.password_is_required_error')}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              mt={5}
              colorScheme="cyan"
              _text={{ color: 'white' }}
              onPress={handleLogin}
              isLoading={isLoading}
            >
              {i18n.t('login.login_button')}
            </Button>
          </VStack>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
