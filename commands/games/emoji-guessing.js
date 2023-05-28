import { SlashCommandBuilder } from 'discord.js'
import askai from '../utils/askai.js'

let player = [];

const emojiGuessing = {
  data: new SlashCommandBuilder()
  .setName('emojiguessing')
  .setDescription('Play a round of emoji guessing game!')
  .addStringOption((option) => option
    .setName('question')
    .setDescription('Type out your question for other to guess')
    .setRequired(true)
  ),
  handler: async (interaction) => {
    if (interaction.commandName == emojiGuessing.data.name) {
      await interaction.reply('Chuan bi ...');
      const question = interaction.options.getString('question');
      const answer = await askai.AIResponseStd(`create a emojis for this question: ${question}`)
      await interaction.editReply(answer);
    }
  }
}

class Player {
  constructor(name) {
    this._name = name;
    this.point = 0
  }

  addPoint(amount) {
    this.point += amount;
  }
}

export default emojiGuessing
