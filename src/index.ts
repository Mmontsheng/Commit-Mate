#!/usr/bin/env node
import 'dotenv/config';

import { GptClient } from './clients/gtpClient';
import { GitClient } from './clients/gitClient';
import enquirer from 'enquirer';
const CANCEL = '--Cancel--';
const exec = async () => {
  const gtpClient = new GptClient(apiKey);
  const gitClient = new GitClient();

  const { error: diffError, changes = '' } = gitClient.getDiff();
  if (diffError) {
    console.log(diffError);
    return;
  }
  const { error: branchNameError, name = ''} = gitClient.getCurrentBranchName();
  if (branchNameError) {
    console.log(branchNameError);
    return;
  }
  const choices = await gtpClient.getMessages(changes ?? '', name?? '');
  choices.push(CANCEL);
  try {
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
  } catch (error) {
    console.log(error);
  }
};

const apiKey = process.env.GPT_API_KEY || '';
if (!apiKey || !apiKey.length) {
  console.error('No api key [GPT_API_KEY], please define api key.\nRead https://github.com/Mmontsheng/Commit-Mate#setup-api-keys for more information');
} else {
  exec();
}
