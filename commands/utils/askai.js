import { SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv'; config();

import { Configuration, OpenAIApi } from "openai";
// const response = await openai.listEngines();

const configuration = new Configuration({
  organization: "org-tCZU73E5kVeB726IGd74QKsp",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const askai = {
  data: new SlashCommandBuilder()
    .setName('askai')
    .setDescription('return answer as an AI model')
    .addBooleanOption((option) => option
      .setName('hidden')
      .setDescription('Chi hien thi tin nhan cho ban than')
      .setRequired(true)
    )
    .addStringOption((option) => option
      .setName('prompt')
      .setDescription('Type your question/prompt')
      .setRequired(true)
      // .setChoices(
      //   {
      //     name: 'dadjoke',
      //     value: 'Generate a random dad joke',
      //     required: false
    //   },
    //   {
    //     name: 'quote',
    //     value: 'Generate a random inspiring quote',
    //     required: false
    //   },
    // )
  ),
  handler: async (interaction) => {
    if (interaction.commandName === askai.data.name) {
      if (interaction.options.getBoolean('hidden')) {
        await interaction.deferReply( {ephemeral:true} );
      } else {
        await interaction.reply('Doi chut ...');
      }
      const question = interaction.options.getString('prompt');
      const answer = await askai.AIResponse(question)
      await interaction.editReply(answer);
    }
  },
  AIResponse: async (question) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: question}],
      max_tokens: 350,
    });
    return completion.data.choices[0].message.content
  }
}

export default askai
