import { SlashCommandBuilder } from 'discord.js'
import { AIResponse } from '../utils/askai.js'

const emojiGuessing = new SlashCommandBuilder()
.setName('emojiguessing')
.setDescription('Play a round of emoji guessing game!')
.addStringOption((option) => option
  .setName('question')
  .setDescription('Type out your question for other to guess')
  .setRequired(true)
);

export default emojiGuessing.toJSON()
