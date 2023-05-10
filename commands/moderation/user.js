import { SlashCommandBuilder } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

const user = {
  data: new SlashCommandBuilder()
  .setName('whoami')
  .setDescription('Provides information about the user.'),
  handler: async (interaction) => {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    if (interaction.commandName == user.data.name) {
      const member = interaction.member
      // const dayFormat = member.joinedAt.getDate() + ' ' + member.joinedAt.getDay() + '-' + member.joinedAt.getMonth() + '-' + member.joinedAt.getFullYear()
      // const minutes = ('0' + member.joinedAt.getMinutes()).slice(-2)
      // const timeFormat = member.joinedAt.getHours() + ':' + minutes
      const joinedGuildAt = formatRelativeTime(member.joinedAt)
      const joinedDiscordAt = formatRelativeTime(interaction.user.createdTimestamp)

      const embed = new EmbedBuilder()
      .setColor(0xb8bb26)
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
      .setThumbnail(interaction.user.avatarURL())
      .addFields(
        { name: 'Joined Discord', value: `\`${joinedDiscordAt}\` `, inline: true },
        { name: 'Member since', value: `\`${joinedGuildAt}\` `, inline: true },
        { name: `Main Role`, value:  `${member.roles.highest}\n`},
      )
      .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};

function formatRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return 'just now';
  } else if (diff < hour) {
    const minutes = Math.round(diff / minute);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diff < day) {
    const hours = Math.round(diff / hour);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diff < week) {
    const days = Math.round(diff / day);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (diff < month) {
    const weeks = Math.round(diff / week);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diff < year) {
    const months = Math.round(diff / month);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.round(diff / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

export default user
