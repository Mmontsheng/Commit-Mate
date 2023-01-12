#!/usr/bin/env node
import 'dotenv/config';

import { GptClient } from './clients/gtpClient';
import { GitClient } from './clients/gitClient';
// import ora from 'ora';
import enquirer from 'enquirer';
const CANCEL = '--Cancel--';
const exec = async () => {
  // const spinner = ora();
  // spinner.start('Getting commit message...hang tight');
  const gtpClient = new GptClient(apiKey);
  const gitClient = new GitClient();

  const { error, changes } = gitClient.getDiff();
  if (error) {
    console.log(error);
  } else {
    const choices = await gtpClient.getMessages(changes ?? '');
    choices.push(CANCEL);
    const answer = await enquirer.prompt<{ message: string }>({
      type: 'select',
      name: 'message',
      message: 'Pick a message',
      choices,
    });
    const { message } = answer;
    if (message === CANCEL) {
      console.log('Operation cancelled');
    } else {
      const { error, response } = gitClient.commit(message);
      console.log(response || error);
    }
  }
  // spinner.stop();
};

const apiKey = process.env.GPT_API_KEY || '';
if (!apiKey || !apiKey.length) {
  console.log('no api key, please define api key');
} else {
  exec();
}
