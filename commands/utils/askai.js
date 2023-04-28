import { SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv'; config();

import { Configuration, OpenAIApi } from "openai";
// const response = await openai.listEngines();

const configuration = new Configuration({
  organization: "org-tCZU73E5kVeB726IGd74QKsp",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function AIResponse(question) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: question}],
    max_tokens: 350,
  });
  return completion.data.choices[0].message.content
}

const askai = new SlashCommandBuilder()
.setName('askai')
.setDescription('return answer as an AI model')
.addStringOption((option) => option
  .setName('prompt')
  .setDescription('Type your question/prompt')
  .setRequired(true)
  .setChoices(
    {
      name: 'dadjoke',
      value: 'Generate a random dad joke'
    },
    {
      name: 'quote',
      value: 'Generate a random inspiring quote',
    },
  )
);

export default askai.toJSON()
