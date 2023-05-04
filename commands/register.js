import { config } from 'dotenv'; config();
import { Routes } from 'discord.js'
import { REST } from '@discordjs/rest'
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// commands requisite
import askai from './utils/askai.js'
import emojiGuessing from './games/emoji-guessing.js';
import server from './moderation/server.js';
import user from './moderation/user.js';

export async function commandRegister() {
  const commands = [
    askai.data.toJSON(),
    emojiGuessing.data.toJSON(),
    server.data.toJSON(),
    user.data.toJSON(),
  ]
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
