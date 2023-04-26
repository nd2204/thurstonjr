import { config } from 'dotenv'; config();

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-tCZU73E5kVeB726IGd74QKsp",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role: "user", content: "say something in japanese"}],
});

console.log(completion.data.choices[0].message.content);
