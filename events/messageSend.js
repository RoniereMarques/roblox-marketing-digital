const Discord = require('discord.js')
const fs = require('fs')
const client = require('../index.js')
// Lê o arquivo permitidos.json
const rawdata = fs.readFileSync('permitidos.json');
const idsPermitidos = JSON.parse(rawdata);
// Obtém os valores dos IDs permitidos
const valoresPermitidos = Object.values(idsPermitidos);

client.on('messageCreate', async (message) => {
   /*  console.log(message.author.id)
    console.log(message.channelId) */
    // ID do usuário a ser verificado
    if (message.author.bot) return;
  // Verificar se o ID do canal existe no objeto
  if (!valoresPermitidos.includes(message.author.id)) {
    message.reply({
      content: `apenas os criadores do rôbo tem a permissão de usar esse comando, caso queira a permissão também solicite ao <@738812418532180062>, <@998145146430439469> & <@738812418532180062>, compre esse rôbo em: https://abre.ai/ronieremarques`,
      ephemeral: true,
    });
  } else {
    if (message.channel.id === "1187067188742475946") {
      if (message.attachments.size > 0) {
        // Baixe os anexos
        var user_id;
        message.attachments.each(async attachment => {
          await message.mentions.users.each(user => {
            user_id = user.id
          })
          let cargo = await message.member.guild.roles.cache.get("1187067187639361610");
          await message.member.roles.add(cargo)
          await message.channel.send({
            content: `<@${user_id}>`,
            embeds: [
              new Discord.EmbedBuilder()
              .setTitle(":heart_eyes:+1 entrega:")
              .setColor("Blue")
              .setDescription(`
                <@${user_id}> Obrigado pela preferência e volte sempre!\n> Ops, e não se esqueca de nós avaliar em <#1187067188742475948>
              `)
              .setImage(`${attachment.url}`)
            ],
            components: [
              new Discord.ActionRowBuilder()

    .addComponents(

        new Discord.ButtonBuilder()

            .setURL('https://discord.com/channels/1187067187580641381/1187067188742475948')

            .setLabel('Avaliações')
            .setEmoji("✅")

            .setStyle(Discord.ButtonStyle.Link)
    )
            ]
          });
          await message.delete()
      });
    } else {
        message.reply('Você esqueceu de por a imagem da entrega.');
    }
    }
  }
  if (message.channel.id === "1187067188742475946") return;
  const topic = message.channel.topic;
    const regex = /#(.*?)&/;
    const match = topic.match(regex);
    let id = match[1];
    if (valoresPermitidos.includes(message.author.id) || id === message.author.id) return;
    message.delete().then(async (success) => {
        message.author.send(
          `Você não tem permissão de digitar no canal https://discord.com/channels/${message.channelId}/${message.channelId} para ter essa permissão peça ao meu criador ela, sua mensagem foi deletada\n\`Mensagem deletada: ${success}\`!\nCaso queira falar com bruno vá até o chat de vendedores é o mecione https://discord.com/channels/1131241255569989725/1131288668309569536`
        );
      });
});