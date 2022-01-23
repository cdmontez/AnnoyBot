const { Client, GuildMember } = require('discord.js') //Line 1 - 11 and Line 28 - 34 is just basic bot setup stuff.
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_PRESENCES'
  ],
  presence: {
    status: 'online',
  }
});
let playing = false; // A "presenceUpdate" if fired whenever any part of someone's presence changes. We want to filter it to just updates on the game they are playing.
client.on('presenceUpdate', (oldMember, newMember) => {
  if (!newMember.activities || newMember.activities.length == 0) {// If either of these is true it will throw an error or not work properly.
    return;
  } else {
    activityList = newMember.activities
    activityList.forEach((activity) => {
      if (activity.name === process.env.GAME && newMember.member.id === process.env.MEMBERID) {
        if (playing === true) {return} else{
          playing = true;
          let channel = client.channels.fetch(process.env.CHANNEL)
            .then(channel => channel.send('<@' + process.env.MEMBERID + '> playing ' + activity.name + ' :flushed:')) // Pings them and says the game they are playing.
        }
      } else {
        playing = false;
      }
    })
  }
});
client.on('ready', () => console.log(`Logged in as ${client.user.tag}`));
client.login(process.env.TOKEN);
console.log('Logging In...')
