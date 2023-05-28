import { Client,  GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv'; config();
import cron from 'node-cron';
const client = new Client({ 
  intents: [ GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds ]
});

const channels = {
  morning: '858900068203364404',
  night: '858900068203364404'
};

const greeting = [
  {
    schedule: '30 6 * * *',
    message: 'Good morning, @everyone!',
    channelId: channels.morning
  },
  {
    schedule: '00 22 * * *',
    message: 'Good night, @everyone!',
    channelId: channels.night
  }
];

const greet = {
  scheduledGreet: async () => {
    await client.login(process.env.TOKEN)
    greeting.forEach(job => {
      cron.schedule(job.schedule, () => {
        const channel = client.channels.cache.get(job.channelId);
        channel.send(job.message);
      }).start();
    });
  },
  handler: (client, ChannelID) => {
    const channel = client.channels.cache.get(ChannelID);
    channel.send(`Hello world, ${client.user.username} is back on duty!`);
  }
}

export default greet
