import { SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv'; config();
import { EmbedBuilder } from '@discordjs/builders';

import { Configuration, OpenAIApi } from "openai";
// const response = await openai.listEngines();

const configuration = new Configuration({
  organization: "org-tCZU73E5kVeB726IGd74QKsp",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const waitEmbed = new EmbedBuilder()
.setColor(0x1d2021)
.setDescription('Doi chut  . . .')

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
  ),
  handler: async (interaction) => {
    if (interaction.commandName === askai.data.name) {
      if (interaction.options.getBoolean('hidden')) {
        await interaction.deferReply( {ephemeral:true} );
      } else {
        await interaction.reply({ embeds: [waitEmbed] });
      }
      const question = interaction.options.getString('prompt');
      const answer = await askai.AIResponse(question)
      const embed = askai.RespondEmbed(question, answer, interaction.user.avatarURL())
      await interaction.editReply({ embeds: [embed] });
    }
  },
  AIResponse: async (question) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: question}],
      max_tokens: 350,
    });
    return completion.data.choices[0].message.content
  },
  RespondEmbed: (question, answer, avatar) => {
    const embed = new EmbedBuilder()
    .setColor(0xb8bb26)
    .setAuthor({ name: question, iconURL: avatar })
    .setDescription(`${answer}`)
    .setTimestamp()

    return embed
  }
}

export default askai
