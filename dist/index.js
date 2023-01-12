#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const gtpClient_1 = require("./clients/gtpClient");
const gitClient_1 = require("./clients/gitClient");
// import ora from 'ora';
const enquirer_1 = __importDefault(require("enquirer"));
const CANCEL = '--Cancel--';
const exec = () => __awaiter(void 0, void 0, void 0, function* () {
    // const spinner = ora();
    // spinner.start('Getting commit message...hang tight');
    const gtpClient = new gtpClient_1.GptClient(apiKey);
    const gitClient = new gitClient_1.GitClient();
    const { error, changes } = gitClient.getDiff();
    if (error) {
        console.log(error);
    }
    else {
        const choices = yield gtpClient.getMessages(changes !== null && changes !== void 0 ? changes : '');
        choices.push(CANCEL);
        const answer = yield enquirer_1.default.prompt({
            type: 'select',
            name: 'message',
            message: 'Pick a message',
            choices,
        });
        const { message } = answer;
        if (message === CANCEL) {
            console.log('Operation cancelled');
        }
        else {
            const { error, response } = gitClient.commit(message);
            console.log(response || error);
        }
    }
    // spinner.stop();
});
const apiKey = process.env.GPT_API_KEY || '';
if (!apiKey || !apiKey.length) {
    console.log('no api key, please define api key');
}
else {
    exec();
}
