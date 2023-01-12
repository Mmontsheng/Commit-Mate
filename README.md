# Commit Mate
What to save time and quickly create well-written and descriptive commit messages without needing to think of them on your own?, look no further.

### Disclaimer
All this project does is talk to GPT-3 API using your api key. If you don't feel safe entering using your api key, audit the code to make sure.

## Introduction
Commit Mate is a `Node.js` based command line tool that uses GPT-3 to generate commit message for your git commits

### Setup API Keys
1. Head over to [openai](https://openai.com/api/) and create a free account
2. Manage or create api key in your [account](https://beta.openai.com/account/api-keys)
3. Set your api key as your enviroment variable, using `GPT_API_KEY` as variable and your generated `apiKey` as the value, you can read more [here](https://www.schrodinger.com/kb/1842) on how to set them.

### How to install

```bash
npm i -g commit-mate
```

### How to use

1. In a git based project, stage your files first `git add .`, then run `commit-mate` to get AI suggested commit messages.
