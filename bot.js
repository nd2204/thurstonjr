// Require the necessary discord.js classes
import { config } from 'dotenv'; config();
import { Client, GatewayIntentBits } from 'discord.js';
import greet from './commands/greet.js'
import { commandRegister } from './commands/register.js';
import askai from './commands/utils/askai.js';
import fs from 'fs'
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
// const CHANNEL_ID = '858900068203364404'
const CHANNEL_ID = '1100414447908032553'
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
    await msg.reply(`Hey ${msg.author.username}!`);
  }
  let isMentioned = msg.mentions.has(CLIENT_ID) && !msg.mentions.everyone;

  if (isMentioned) {
    const question = msg.content.replace(`<@${CLIENT_ID}>`, '');
    // console.log(question);
    const answer = await askai.AIResponse(question)
    await msg.reply(answer);
  }

  if (msg.content === `${PREFIX}shutdown` && msg.author.id === MY_ID) {
    await msg.reply('Shutting down ...');
    process.exit(0);
  }
  
  if (msg.content.includes(`${PREFIX}todo`) && msg.author.id === MY_ID) {
    const todoFile = 'TODO.md'
    // const content = msg.content
    const content = msg.content.replace(`${PREFIX}todo`, `\n[ ${msg.createdAt} ]`)
    fs.appendFile( todoFile, content, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Added a todo to ${todoFile}`)
    })
    await msg.reply('TODO added');
  }
});

// Register command to the discord server
commandRegister();
// Interaction event listener

import emojiGuessing from './commands/games/emoji-guessing.js';
import user from './commands/moderation/user.js';
import server from './commands/moderation/server.js';

client.on('interactionCreate', async interact => {
  if (!interact.isChatInputCommand()) return;
  // console.log(interact);
  askai.handler(interact);
  emojiGuessing.handler(interact);
  user.handler(interact);
  server.handler(interact);
})

