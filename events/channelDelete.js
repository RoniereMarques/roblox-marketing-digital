const Discord = require('discord.js');
const fs = require('fs');
const client = require('../index.js');

client.on('channelDelete', async (channel) => {
    // Caminho para o arquivo JSON
    const caminhoArquivo = 'channels.json';

    // Verificar se o arquivo JSON existe
    if (fs.existsSync(caminhoArquivo)) {
        // Ler o conteúdo atual do arquivo
        const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
        
        // Converter o conteúdo para um objeto JavaScript
        const data = JSON.parse(conteudoArquivo);

        // Converter o channel.id para string
        const channelIDString = channel.id;

        // Verificar se o ID do canal excluído está presente no objeto JSON
        if (data[channelIDString] && data[channelIDString].channel_id === channelIDString) {
            console.log(`Canal com ID ${channelIDString} foi excluído e sua categoria foi removida.`);
        }
    }
});