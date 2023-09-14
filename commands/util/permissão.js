const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "permissão", // Coloque o nome do comando
  description: "gerenciar permissões do bot, adicionar, remover permissão!", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    interaction.reply({
        embeds: [
            new Discord.EmbedBuilder()
            .setTitle(`Painel bot VIP`)
            .setDescription(`Olá fresco(a), esse comando apenas brunomodzs poderá mexer pós ele contratou a lenda para programar, mesmo que você consiga ver algumas coisas como lista de quem tem permissão você não irá conseguir fazer nada a não ser ver ): mais porque não coloquei para nem essa mensagem aparecer para você? ia dar mais trabalho = "code" é eu não gosto de programar sendo que da para por logicas basicas!`)
            .setTimestamp()
            .setThumbnail('https://images-ext-1.discordapp.net/external/OcIvb0ytYW1Zsfpm3SIpJfE-eytotMC7a1ndLNbvARw/https/cdn.discordapp.com/icons/1131241255569989725/a_805aa76f1703b5a93252cd61cf812f48.gif?width=102&height=102')
            .setImage('https://cdn.discordapp.com/attachments/1058174986189295656/1146558718390063155/standard.gif')
            .setFooter({ text: `@ ronieremarques with brunomodzs (:`, iconURL: 'https://images-ext-1.discordapp.net/external/OcIvb0ytYW1Zsfpm3SIpJfE-eytotMC7a1ndLNbvARw/https/cdn.discordapp.com/icons/1131241255569989725/a_805aa76f1703b5a93252cd61cf812f48.gif?width=102&height=102'})
        ],
        components: [
            new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
			.setCustomId('list')
			.setPlaceholder('Escolha um usuário caso queira remover permissão.')
			.addOptions(
				new Discord.StringSelectMenuOptionBuilder()
					.setLabel('Bulbasaur')
					.setDescription('The dual-type Grass/Poison Seed Pokémon.')
					.setValue('bulbasaur'),
				new Discord.StringSelectMenuOptionBuilder()
					.setLabel('Charmander')
					.setDescription('The Fire-type Lizard Pokémon.')
					.setValue('charmander'),
				new Discord.StringSelectMenuOptionBuilder()
					.setLabel('Squirtle')
					.setDescription('The Water-type Tiny Turtle Pokémon.')
					.setValue('squirtle'),
            )
			)
        ],
        ephemeral: true
    })
  },
};
