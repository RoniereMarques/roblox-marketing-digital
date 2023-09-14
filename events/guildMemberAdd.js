const Discord = require('discord.js')
const client = require('../index.js')
const fs = require('fs')
const caminhoArquivo = 'channels.json';

client.on('guildMemberAdd', async member => {
    // Ler o conteúdo atual do arquivo
    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
    
    // Converter o conteúdo para um objeto JavaScript
    const data = JSON.parse(conteudoArquivo);
    
    const idUsuario = member.user.id;
    
    // Verificar se o ID do usuário já existe no JSON
    if (!data.hasOwnProperty(idUsuario)) {

        // Adicionar o novo usuário ao JSON
        data[idUsuario] = {
            id: idUsuario
        };

        // Salvar no JSON
        fs.writeFileSync(caminhoArquivo, JSON.stringify(data, null, 2), 'utf-8');
    }
});