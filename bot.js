// Require the necessary classes
import { config } from 'dotenv'; config();
import { Client, GatewayIntentBits } from 'discord.js';
import greet from './commands/greet.js'
import askai from './commands/utils/askai.js';
import fs from 'fs'
import { EmbedBuilder } from '@discordjs/builders';
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID
const MY_ID = '453195118871314442'
const CHANNEL_ID = '858900068203364404'
// const CHANNEL_ID = '1100414447908032553'
client.login(TOKEN);

let PREFIX = '!';

// Run this code once when the client is ready
client.once('ready', client => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  greet.scheduledGreet();
  greet.handler(client, CHANNEL_ID);
});

// Messages event listener
client.on('messageCreate', async msg => {
  if (msg.content.includes('thurston') && msg.author.id !== CLIENT_ID ) {
    if (msg.author.id === MY_ID) {
      await msg.reply('Hi Creator!')
    } else if (msg.author.id === msg.guild.ownerId) {
      await msg.reply('Hello server\'s owner!')
    } else {
      await msg.reply(`Hey ${msg.author.username}!`);
    }
  }
  let isMentioned = msg.mentions.has(CLIENT_ID) && !msg.mentions.everyone;

  if (isMentioned) {
    const question = msg.content.replace(`<@${CLIENT_ID}>`, '');
    // console.log(question);
    const answer = await askai.AIResponse(question)
    const embed = askai.RespondEmbed( question , answer, msg.author.avatarURL())
    await msg.reply({ embeds: [embed] });
  }

  if (msg.content === `${PREFIX}shutdown` && msg.author.id === MY_ID) {
    await msg.reply('Shutting down ...');
    process.exit(0);
  }

  if (msg.content.includes(`${PREFIX}todo`) && msg.author.id === MY_ID) {
    const todoFile = 'TODO.md'
    const dayFormat = msg.createdAt.getDate() + '-' + msg.createdAt.getMonth() + '-' + msg.createdAt.getFullYear()
    const content = msg.content.replace(`${PREFIX}todo`, `- [ ] ( ${dayFormat} )`)


    if (msg.content === `${PREFIX}todo show`) {
      let readContent = fs.readFileSync(todoFile, 'utf-8');
      let embed = new EmbedBuilder().setColor(0x282828).setDescription('```md\n' + `${readContent}` + '\n```');
      await msg.reply({ embeds: [embed] });
    } else {
      fs.appendFile( todoFile, content, err => { if (err) throw err; })
      let embed = new EmbedBuilder().setColor(0x282828).setDescription(`Todo added!`);
      await msg.reply({ embeds: [embed] });
    }
  }
});

// Register command to the discord server
import { commandRegister } from './commands/register.js';
commandRegister();
// Interaction event listener

import emojiGuessing from './commands/games/emoji-guessing.js';
import user from './commands/moderation/user.js';
import server from './commands/moderation/server.js';

client.on('interactionCreate', async interact => {
  if (!interact.isChatInputCommand()) return;
  askai.handler(interact);
  emojiGuessing.handler(interact);
  user.handler(interact);
  server.handler(interact);
})

