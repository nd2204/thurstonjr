import { CronJob } from 'cron';
// Require the necessary discord.js classes
import { config } from 'dotenv'; config();
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'
import { AIResponse } from './commands/askai.js'
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});

const channel = client.channels.cache.get('858900068203364404');
// const channel = client.channels.cache.get('1100414447908032553');
const goodnight = new CronJob('00 23 * * *', () => {
  channel.send('Good Night! @everyone');
});

const goodmorning = new CronJob('30 06 * * *', () => {
  channel.send('Good Morning! @everyone');
});

goodmorning.start();
goodnight.start();


// Create a new client instance

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// const inviteLink = client.generateInvite( { scopes: [OAuth2Scopes.ApplicationsCommands] })

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID

// Run this code once when the client is ready
client.once('ready', client => {
  console.log(`Ready! Logged in as ${client.user.tag}`); 
  // const channel = client.channels.cache.get('858900068203364404');
  // channel.send(`Hello world, ${client.user.username} is back on duty!`);
});

client.on('messageCreate', async msg => {
  if (msg.content.includes('thurston') && msg.author.id !== CLIENT_ID ) {
    await msg.reply(`Hey ${msg.author.username}!`);
  }
  let isMentioned = msg.mentions.has(CLIENT_ID) && !msg.mentions.everyone;

  if (isMentioned) {
    const question = msg.content.replace(`<@${CLIENT_ID}>`, '');
    // console.log(question);
    const answer = await AIResponse(question)
    await msg.reply(answer);
  }

  if (msg.content === '!logout' && msg.author.id === '453195118871314442') {
    await msg.reply('Shutting down ...');
    process.exit(0);
  }
});

client.on('interactionCreate', async interact => {
  if (!interact.isChatInputCommand()) return;
  // console.log(interact);
  if (interact.commandName == 'askai') {
    await interact.reply('Doi chut ...');
    const question = interact.options.getString('prompt');
    const answer = await AIResponse(question)
    // await interact.editReply(`Your question: ` + question + `\nMy answer: ` + answer);
    await interact.editReply(answer);
  }

})


async function slashCommandHandler() {
  const commands = [
    {
      name: 'askai',
      description: 'return answer as an AI model',
      options: [
        {
          name: 'prompt',
          description: 'type your question/prompt',
          required: 'true',
          type: 3,
          choices: [
            {
              name: 'dadjoke',
              value: 'generate a random dad joke',
            },
            {
              name: 'quote',
              value: 'generate a random inspiring quote',
            }
          ],
        }
      ]
    },
    {
      name: 'thurston',
      description: 'greet!',
    }
  ]
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}


slashCommandHandler();


client.login(TOKEN);
