const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('fs');

module.exports = {

  data: new SlashCommandBuilder()

    .setName('addservice')

    .setDescription('Crée un nouveau service et un fichier txt associé.')

    .setDefaultPermission(false)

    .addStringOption(option =>

      option.setName('service')

        .setDescription('Nom du nouveau service à créer.')

        .setRequired(true)),

  async execute(interaction) {

    // Vérifier si l'utilisateur a la permission d'administrateur

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {

      return interaction.reply({ content: 'Vous devez être administrateur pour exécuter cette commande.', ephemeral: true });

    }

    // Récupérer le nom du service depuis l'interaction

    const serviceName = interaction.options.getString('service');

    // Vérifier si le service existe déjà

    const serviceFilePath = `./services/${serviceName}.txt`;

    if (fs.existsSync(serviceFilePath)) {

      return interaction.reply({ content: `Le service ${serviceName} existe déjà.`, ephemeral: true });

    }

    try {

      // Créer le fichier du service

      fs.writeFileSync(serviceFilePath, '');

      return interaction.reply(`Le service ${serviceName} a été créé avec succès.`);

    } catch (error) {

      console.error(error);

      return interaction.reply({ content: 'Une erreur est survenue lors de la création du service.', ephemeral: true });

    }

  },

};

