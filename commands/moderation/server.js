import { SlashCommandBuilder } from 'discord.js';

const server = {
  data: new SlashCommandBuilder()
  .setName('server')
  .setDescription('Thong tin cua server.'),
  handler: async (interaction) => {
    if (interaction.commandName === server.data.name) {
      await interaction.reply(`This server name is: ${interaction.guild.name}, There are ${interaction.guild.memberCount} member`);
    }
  }
}

export default server
