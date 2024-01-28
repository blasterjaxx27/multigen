const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('fs');

module.exports = {

  data: new SlashCommandBuilder()

    .setName('stock')

    .setDescription('Affiche le stock de tous les services.'),

  async execute(interaction) {

    try {

      // Récupérer la liste des fichiers de services

      const serviceFiles = fs.readdirSync('./services').filter(file => file.endsWith('.txt'));

      if (serviceFiles.length === 0) {

        return interaction.reply({ content: 'Aucun service disponible.', ephemeral: true });

      }

      let stockMessage = 'Stock de services:\n';

      // Parcourir chaque fichier de service et ajouter les informations au message

      for (const serviceFile of serviceFiles) {

        const serviceName = serviceFile.slice(0, -4); // Retirer l'extension .txt

        const accounts = fs.readFileSync(`./services/${serviceFile}`, 'utf-8').split('\n').filter(Boolean);

        stockMessage += `${serviceName}: Stock ${accounts.length}\n`;

      }

      return interaction.reply({ content: stockMessage, ephemeral: true });

    } catch (error) {

      console.error(error);

      return interaction.reply({ content: 'Une erreur est survenue lors de la récupération du stock.', ephemeral: true });

    }

  },

};

