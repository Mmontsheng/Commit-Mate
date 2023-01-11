#!/usr/bin/env node
import 'dotenv/config';

import { GptClient } from './clients/gtpClient';
import { GitClient } from './clients/gitClient';

const apiKey = process.env.GPT_API_KEY || '';
if (!apiKey || !apiKey.length) {
  console.log('no api key, please define api key');
}

const gtpClient = new GptClient(apiKey);
const gitClient = new GitClient();

const { error, changes} = gitClient.getDiff();
if (error) {
  console.log(error);
  process.exit(1);
} else {
  gtpClient.getMessages(changes ?? '');
}
