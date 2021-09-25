import axios from 'axios';

const logout = async ({ token }: { token: string }): Promise<void> => {
  const { data } = await axios.post('https://interlock.pp.ua/api/ios.php', {
    cmd: 'user_user_del_key',
    token,
  });

  if (typeof data !== 'object') {
    throw new Error();
  }
};

export default logout;
