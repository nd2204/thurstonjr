const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('thurston')
        .setDescription('greet!'),
    async execute(interaction) {
        await interaction.reply(`Hey! ${interaction.user.username}`);
    },
}
