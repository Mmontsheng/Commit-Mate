#!/usr/bin/env node
import 'dotenv/config'
import { execSync } from 'child_process';

import { GptClient } from './gtpClient';

const apiKey = process.env.GPT_API_KEY || '';
if(!apiKey || !apiKey.length) {
  console.log('no api key, please define api key');
}

const gtpClient = new GptClient(apiKey);
let branch = '';
try {
  branch = execSync('git diff --name-only').toString();
  if (!branch) {
    console.log('No changes to commit.');
    process.exit(0);
  }
} catch (e) {
  console.log('Failed to run git diff --cached');
  process.exit(1);
}
// console.log(diff);

gtpClient.getMessages(branch);