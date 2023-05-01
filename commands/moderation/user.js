import { SlashCommandBuilder } from 'discord.js';

const user = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Provides information about the user.'),
	handler: async (interaction) => {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
    if (interaction.commandName == user.data.name) {
      await interaction.reply(`Your name is ${interaction.user.username}, you joined on ${interaction.member.joinedAt}.`);
    }
	},
};

export default user
