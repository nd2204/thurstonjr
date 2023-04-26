// Require the necessary discord.js classes
import { config } from 'dotenv'; config();
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest'

// Create a new client instance
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});
	
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
// const inviteLink = client.generateInvite( { scopes: [OAuth2Scopes.ApplicationsCommands] })

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID

// Run this code once when the client is ready
client.once('ready', c => {
  console.log(`Ready! Logged in as ${c.user.tag}`); 
  const channel = c.channels.cache.get('858900068203364404');
  // Send the message
  channel.send(`Hello world, ${c.user.username} is back on duty!`);
}
);
client.login(TOKEN);

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
});

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-tCZU73E5kVeB726IGd74QKsp",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// console.log(completion.data.choices[0].message.content);

client.on('interactionCreate', async interact => {
  if (interact.isChatInputCommand()) {
    await interact.reply('Doi chut ...');
    const question = interact.options.getString('prompt');
    const answer = await AIResponse(question)
    await interact.editReply(`Your question: ` + question + `\nMy answer: ` + answer);
  }
})

async function AIResponse(question) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: question}],
    max_tokens: 350,
  });
  return completion.data.choices[0].message.content
}

async function askai() {
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
        }
      ]
    },
  ]
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}

askai();
