import { Configuration, OpenAIApi } from "openai";

export class GptClient{
  openai : any;
  constructor(apiKey: string) {
     const configuration = new Configuration({
      apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  async getMessages(filesChanged: string) {
    const prompt = `generate five git commit messages based on the following files that changed: ${filesChanged}`
    try {
      const response = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
      });
      console.log(response.data.choices[0].text.split(/\r?\n/).filter((t: string) => t?.length));
      
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
        
    }
  }
}