#!/usr/bin/env node
import 'dotenv/config'
import { execSync } from 'child_process';

import { GptClient } from './gtpClient';
const GIT_COMMAND = 'git diff --name-only';

const apiKey = process.env.GPT_API_KEY || '';
if(!apiKey || !apiKey.length) {
  console.log('no api key, please define api key');
}

const gtpClient = new GptClient(apiKey);
let filesChanged = '';
try {
  filesChanged = execSync('git diff --name-only').toString();
  if (!filesChanged) {
    console.log('No changes to commit.');
    process.exit(0);
  }
} catch {
  console.log(`Failed to run ${GIT_COMMAND}.\nPossible cause: Not a git branch`);
  process.exit(1);
}
// console.log(diff);

gtpClient.getMessages(filesChanged);