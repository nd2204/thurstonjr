// Require the necessary discord.js classes
import { config } from 'dotenv'; config();
import { Client, GatewayIntentBits } from 'discord.js';
import { scheduledGreet } from './commands/greet.js'
import { commandRegister } from './commands/register.js';
import askai from './commands/utils/askai.js';
// Create a new client instance
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID
const CHANNEL_ID = '858900068203364404'
client.login(TOKEN);

let PREFIX = '!';

// Run this code once when the client is ready
client.once('ready', client => {
  console.log(`Ready! Logged in as ${client.user.tag}`); 
  scheduledGreet();
  // const channel = client.channels.cache.get(CHANNEL_ID);
  // channel.send(`Hello world, ${client.user.username} is back on duty!`);
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

  if (msg.content === `${PREFIX}shutdown` && sg.author.id === '453195118871314442') {
    await msg.reply('Shutting down ...');
    process.exit(0);
  }
});

// Register command to the discord server
commandRegister();
// Interaction event listener

import emojiGuessing from './commands/games/emoji-guessing.js';

client.on('interactionCreate', async interact => {
  if (!interact.isChatInputCommand()) return;
  // console.log(interact);
  askai.handler(interact)
  emojiGuessing.handler(interact)
})
