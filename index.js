const { Client, GatewayIntentBits } = require('discord.js');

const fs = require('fs');

const { REST } = require('@discordjs/rest');

const { Routes } = require('discord-api-types/v9');

const client = new Client({

  intents: [

    GatewayIntentBits.Guilds,

    GatewayIntentBits.GuildMessages,

    GatewayIntentBits.MessageContent,

  ],

});
const channelId ='YOUR_CHANNEL_ID';

client.commands = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

  const command = require(`./commands/${file}`);

  client.commands.set(command.data.name, command);

}

client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}`);
setInterval(() => {

    const channel = client.channels.cache.get(channelId);

    if (channel) {

      channel.send('# gÃ©nÃ©rateur free compte uncheck gÃ©nÃ©rateur vip compte check a 50% ');

    } else {

      console.error('Le salon spÃ©cifiÃ© n\'a pas Ã©tÃ© trouvÃ©.');

    }

  }, 30 * 60 * 1000); // 30 minutes en millisecondes

});

  const commands = Array.from(client.commands.values()).map(command => command.data.toJSON());

  

  const rest = new REST({ version: '9' }).setToken('YOUR_TOKEN_BOT');

  (async () => {

    try {

      console.log('Started refreshing application (/) commands.');

      await rest.put(

        Routes.applicationGuildCommands('YOUR_ID_CLIENT', 'YOUR_GUILD_ID'),

        { body: commands },

      );

      console.log('Successfully reloaded application (/) commands.');

    } catch (error) {

      console.error(error);

    }

  })();



client.on('interactionCreate', async interaction => {

  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (!client.commands.has(commandName)) return;

  try {

    await client.commands.get(commandName).execute(interaction);

  } catch (error) {

    console.error(error);

    await interaction.reply({ content: 'Une erreur est survenue lors de l\'exÃ©cution de la commande.', ephemeral: true });

  }

});

client.login('YOUR_TOKEN_BOT');

