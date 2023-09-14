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