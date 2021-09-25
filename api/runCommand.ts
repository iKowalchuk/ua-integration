import axios from 'axios';

const runCommand = async ({
  token,
  command,
}: {
  token: string;
  command: string;
}): Promise<void> => {
  const { data } = await axios.post('https://interlock.pp.ua/api/ios.php', {
    cmd: 'run_cmd',
    name_cmd: command,
    token,
  });

  if (typeof data !== 'object') {
    throw new Error();
  }
};

export default runCommand;
