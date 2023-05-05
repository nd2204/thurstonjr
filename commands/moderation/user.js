import { SlashCommandBuilder } from 'discord.js';

const user = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Provides information about the user.'),
	handler: async (interaction) => {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
    if (interaction.commandName == user.data.name) {
    const member = interaction.member
    const dayFormat = member.joinedAt.getDate() + ' ' + member.joinedAt.getDay() + '-' + member.joinedAt.getMonth() + '-' + member.joinedAt.getFullYear()
    const timeFormat = member.joinedAt.getHours() + ':' + (member.joinedAt.getMinutes()<10?'0':'') 
      await interaction.reply(
        `Your name is ${interaction.user.username}, you joined at ${timeFormat} ${dayFormat}, your major role in this server is ${member.roles.highest.name}.`
      );
    }
	},
};

export default user
