import api from './api';

const logout = async ({ token }: { token: string }): Promise<void> => {
  const { data } = await api.post('/api/ios.php', {
    cmd: 'user_user_del_key',
    token,
  });

  if (typeof data !== 'object') {
    throw new Error();
  }
};

export default logout;
