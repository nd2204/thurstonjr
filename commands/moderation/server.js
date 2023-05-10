import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

const server = {
  data: new SlashCommandBuilder()
  .setName('server')
  .setDescription('Thong tin cua server.'),
  handler: async (interaction) => {

    const embed = new EmbedBuilder()
    .setColor(0xb8bb26)
    .setAuthor( {name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`} )
    .addFields(
      { name: 'Server information:', value: 
        `Current server owner - <@${interaction.guild.ownerId}>\n` +
        `Member - ${interaction.guild.memberCount} \n`
      }
    )
    .setTimestamp();

    if (interaction.commandName === server.data.name) {
      await interaction.reply({ embeds: [embed] });
      console.log(interaction)
    }
  }
}

export default server
