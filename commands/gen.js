const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('fs');

module.exports = {

  data: new SlashCommandBuilder()

    .setName('gen')

    .setDescription('Génère un compte et l\'envoie en message privé.')

    .setDefaultPermission(false)

    .addStringOption(option =>

      option.setName('service')

        .setDescription('Nom du service pour lequel générer le compte.')

        .setRequired(true)),

  async execute(interaction) {

    // Vérifier si la commande est exécutée dans le salon autorisé

    if (interaction.channelId !== '1200128384219500584') {

      return interaction.reply({ content: 'Cette commande n\'est pas autorisée dans ce salon.', ephemeral: true });

    }

    // Charger le nom du service depuis l'interaction

    const serviceName = interaction.options.getString('service');

    // Chemin du fichier contenant les comptes du service spécifié

    const filePath = `./services/${serviceName}.txt`;

    try {

      // Lire le fichier pour obtenir le compte

      const accounts = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);

      if (accounts.length === 0) {

        return interaction.reply({ content: `Aucun compte disponible pour le service ${serviceName}.`, ephemeral: true });

      }

      // Sélectionner un compte au hasard

      const selectedAccount = accounts[Math.floor(Math.random() * accounts.length)];

      // Envoyer le compte par message privé à l'utilisateur

      await interaction.user.send(`Voici votre compte pour ${serviceName}: ${selectedAccount}`);

      // Supprimer le compte du fichier

      fs.writeFileSync(filePath, accounts.filter(account => account !== selectedAccount).join('\n'));

      // Envoyer le compte dans le salon

      await interaction.reply(`Compte généré et envoyé en message privé à ${interaction.user.username} pour le service ${serviceName}.`);

    } catch (error) {

      console.error(error);

      return interaction.reply({ content: 'Une erreur est survenue lors de la génération du compte.', ephemeral: true });

    }

  },

};

