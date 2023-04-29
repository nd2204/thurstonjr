import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Thong tin cua server.');
export async function execute(interaction) {
  await interaction.reply(`Server nay ten la: ${interaction.guild.name}, Co ${interaction.guild.memberCount} thanh vien`);
}
