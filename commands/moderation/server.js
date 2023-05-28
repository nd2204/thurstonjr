import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

const server = {
  data: new SlashCommandBuilder()
  .setName('server')
  .setDescription('Thong tin cua server.'),
  handler: async (interaction) => {

    const embed = new EmbedBuilder()
    .setColor(0xb8bb26)
    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
    .setThumbnail(interaction.guild.iconURL())
    .addFields(
      { name: `Server owner`, value: `<@${interaction.guild.ownerId}>\n` },
      { name: `Member count`, value: `\`${interaction.guild.memberCount} members\`` },
    )
    .setTimestamp();

    if (interaction.commandName === server.data.name) {
      await interaction.reply({ embeds: [embed] });
    }
  }
}

export default server
