const Discord = require('discord.js');
const fs = require('fs');
const { PIX } = require("gpix/dist");
const Canvas = require("canvas");
const client = require('../index.js');
// Lê o arquivo permitidos.json
const rawdata = fs.readFileSync('permitidos.json');
const idsPermitidos = JSON.parse(rawdata);
// Obtém os valores dos IDs permitidos
const valoresPermitidos = Object.values(idsPermitidos);
const { dataflow } = require('googleapis/build/src/apis/dataflow/index.js');
const { toUnicode } = require('punycode');

client.on('interactionCreate', async (interaction) => {
  // interações de botões aqui
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.reply(`Error`);
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    cmd.run(client, interaction);
  }
  if (!interaction.isButton()) return;

  const { customId } = interaction;
  const channelId = interaction.channelId;
  const messageId = interaction.message.id;

  if (customId === 'generete-payments') {
    if (interaction.user.bot) return;
    // Caminho para o arquivo JSON
const caminhoArquivo = 'channels.json';

// Ler o conteúdo atual do arquivo
const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');

// Converter o conteúdo para um objeto JavaScript
const data = JSON.parse(conteudoArquivo);
// Verificar se o ID do canal existe no objeto
if (valoresPermitidos.includes(interaction.user.id)) {
// Caminho para o arquivo JSON existente
const caminhoArquivo = "estoques.json";

// Lê o conteúdo atual do arquivo
const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
const dadosExistente = JSON.parse(conteudoArquivo);

// Percorre todos os produtos e verifica o messageId
for (const produtoKey in dadosExistente) {
  const produto = dadosExistente[produtoKey];

  const pix = PIX.dinamic()
    .setReceiverName("Jaqueline Luiza Da Silva")
    .setReceiverCity("Brasil")
    .setKey("d5086fcd-81d6-4d09-900b-3e4fea41dfe7")
    .setDescription(`agradeço pela preferência :D`)
    .setAmount(Number(produto.valor));

  const canvas = Canvas.createCanvas(1200, 1200);
  const context = canvas.getContext("2d");
  const qrCodeImage = await Canvas.loadImage(await pix.getQRCode());
  context.fillStyle = "#FFFFFF";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(qrCodeImage, 0, 0, canvas.width, canvas.height);

  const embed = new Discord.EmbedBuilder()
    .setTitle(`Pagamento`)
    .setImage(`attachment://qrcode.png`)
    .setTimestamp()
    .setColor('Green')
    .setDescription(`Chave pix aleatória, lembre-se de enviar o comprovante aqui, termos é regras [Black Fruits](https://db.blogs-tutorials.com/termos%20de%20uso/index.html):\n\`\`\`d5086fcd-81d6-4d09-900b-3e4fea41dfe7\`\`\`\nChave pix e-mail:\n\`\`\`brunodasilvamarquee@gmail.com
\`\`\`\naqui na blox fruits community você escolhe como quer pagar!   `)

  const embedpayment = interaction.reply({
    embeds: [embed],
    fetchReply: true,
    files: [
      {
        name: "qrcode.png",
        attachment: canvas.toBuffer(),
      },
    ],
  });
}
}
} /* else if (interaction.channel.topic.split('#')[1] !== interaction.user.id) {
  return interaction.reply({ content: `apenas bruno ou a pessoa que criou o ticket pode fazer isso!`, ephemeral: true});
} */

  if (customId === 'btn-sales') {
    // Caminho para o arquivo JSON existente
    const caminhoArquivo = "estoques.json";

    // Lê o conteúdo atual do arquivo
    const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
    const dadosExistente = JSON.parse(conteudoArquivo);

    // Percorre todos os produtos e verifica o messageId
    for (const produtoKey in dadosExistente) {
      const produto = dadosExistente[produtoKey];
      if (produto && produto.messageId === messageId) {
        if (produto.limite === 1) {
          // Diminuir o limite para 0 e atualizar o JSON
          produto.limite = 0;
          const dadosJSON = JSON.stringify(dadosExistente, null, 2);
          fs.writeFileSync(caminhoArquivo, dadosJSON, 'utf-8');
          
          const userId = interaction.user.id;
          const existingChannel = interaction.guild.channels.cache.find(
            (channel) => {
              return channel.topic === `💌 criador do carrinho <@${userId}> id: ${userId}, caso queira comprar um rôbo assim ou diferente com outras funções clique em: https://abre.ai/ronieremarques`;
            }
          );

          if (existingChannel) {
            // O canal com o tópico do usuário já existe
            interaction.user.send({
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor('Red')
                  .setTimestamp()
                  .setTitle(`${interaction.guild}`)
                  .setFooter({
                    text: `${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL(),
                  })
                  .setThumbnail(interaction.user.displayAvatarURL())
                  .setDescription(
                    `❌・Você **já tem um ticket** aberto em: ${existingChannel}, você não pode comprar esse produto 2 vezes apenas 1, os clientes precisa aproitar a promoção também :D!`
                  ),
              ],
              ephemeral: true,
            });
          } else {
            // Diminuir o limite e atualizar o JSON
          produto.limite--;
          const dadosJSON = JSON.stringify(dadosExistente, null, 2);
          fs.writeFileSync(caminhoArquivo, dadosJSON, 'utf-8');
            interaction.guild.channels
              .create({
                name: `🛒・${produto.nome}`,
                topic: `💌 criador do carrinho <@${userId}> id: ${userId}, caso queira comprar um rôbo assim ou diferente com outras funções clique em: https://abre.ai/ronieremarques #${userId}&${messageId}`,
                parent: `1151157022805459114`,
                permissionOverwrites: [
                  {
                    id: interaction.guildId,
                    deny: [
                      Discord.PermissionFlagsBits.ViewChannel,
                      Discord.PermissionFlagsBits.CreatePublicThreads,
                      Discord.PermissionFlagsBits.CreatePrivateThreads,
                      Discord.PermissionFlagsBits.SendMessagesInThreads,
                      Discord.PermissionFlagsBits.UseApplicationCommands,
                    ],
                  },
                  {
                    id: interaction.user.id,
                    allow: [
                      Discord.PermissionFlagsBits.ViewChannel,
                      Discord.PermissionFlagsBits.SendMessages,
                    ],
                  },
                ],
              })
              .then(async (ch) => {
                // Caminho para o arquivo JSON
                const caminhoArquivo = "channels.json";

                // IDs a serem verificados e adicionados
                const novoIDUsuario = interaction.user.id;
                const novoIDCanal = ch.id;

               // Ler o conteúdo atual do arquivo
  const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
  
  // Converter o conteúdo para um objeto JavaScript
  const data = JSON.parse(conteudoArquivo);
  
  // Adicionar o novo ID de usuário ao objeto
  data[novoIDUsuario] = { id: novoIDUsuario, channel_id: novoIDCanal };
    
  // Converter de volta para JSON
  const novoConteudo = JSON.stringify(data, null, 2);

  // Escrever o novo conteúdo no arquivo
  fs.writeFileSync(caminhoArquivo, novoConteudo, 'utf-8');
                
                // Desabilitar o botão se o limite for 0
                await interaction.update({
                  components: [
                    new Discord.ActionRowBuilder().addComponents(
                      new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setCustomId("btn-sales")
                        .setEmoji("<:Carrinho_WJ:1139361347633692723>")
                        .setLabel("Comprar")
                        .setDisabled(true)
                    ),
                  ],
                });
                interaction.user.send({
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setColor("Green")
                      .setTimestamp()
                      .setTitle(`${interaction.guild}`)
                      .setFooter({
                        text: `${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL(),
                      })
                      .setDescription(
                        `✅・Seu **ticket** foi aberto em: ${ch}, clique no **botão** abaixo para ir até ele, dica: paga pelo produto para assim quando o vendedor estiver online possa te mandar direto!`
                      )
                      .setThumbnail(interaction.user.displayAvatarURL()),
                  ],
                  components: [
                    new Discord.ActionRowBuilder().addComponents(
                      new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL(
                          `https://discord.com/channels/${interaction.guild.id}/${ch.id}`
                        )
                        .setLabel("Ir até o ticket!")
                    ),
                  ],
                  ephemeral: true,
                });
                ch.send({
                  allowedMentions: { users: ["1146549621141811262"] },
                  content: `<@&1146549621141811262>`,
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setColor("Red")
                      .setTitle(`${interaction.guild}`)
                      .setFooter({
                        text: "Aguarde enquanto o bruno possa atender você!",
                        iconURL: interaction.user.displayAvatarURL(),
                      })
                      .setDescription(
                        `Olá <@&1146549621141811262> queria aproveitar a promoção \`${produto.nome}\`, aguardo você mim responder, Dica: você pode adiantar-se é pagar logo para que quando ele estiver disponivel já manda seu produto, para isso você pode clicar em \`pagar\` no botão abaixo.`
                      )
                      .setThumbnail(
                        interaction.user.displayAvatarURL({ dynamic: true })
                      ),
                  ],
                  components: [
                    new Discord.ActionRowBuilder().addComponents(
                      new Discord.ButtonBuilder()
                      .setLabel("pagar")
                      .setEmoji('💸')
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setCustomId("generete-payments")
                    ),
                  ],
                }).then((m) => {
                  m.pin();
                  m.channel.send({
                    allowedMentions: { users: [interaction.user.id] },
                    content: `<@${interaction.user.id}>`,
                    embeds: [
                      new Discord.EmbedBuilder()
                        .setColor("Yellow")
                        .setThumbnail(
                          "https://media.discordapp.net/attachments/1142885479134531684/1142969756299833354/Design_sem_nome-removebg-preview.png?width=32&height=32"
                        )
                        .setDescription(
                          `🔔・Foi enviado um alerta a <@&1146549621141811262> que você está esperando ele nesse ticket de compra, espere ele o responder.`
                        ),
                    ],
                  });
                });
              })
              .catch(async (err) => {
                interaction.reply({
                  content: `Ouve um erro: ${err} lembre-se de configurar tudo!`,
                  ephemeral: true,
                });
              });
          }
        
        } else {
          const userId = interaction.user.id;
          const existingChannel = interaction.guild.channels.cache.find(
            (channel) => {
              return channel.topic === `💌 criador do carrinho <@${userId}> id: ${userId}, caso queira comprar um rôbo assim ou diferente com outras funções clique em: https://abre.ai/ronieremarques`;
            }
          );

          if (existingChannel) {
            // O canal com o tópico do usuário já existe
            interaction.reply({
              embeds: [
                new Discord.EmbedBuilder()
                  .setColor('Red')
                  .setTimestamp()
                  .setTitle(`${interaction.guild}`)
                  .setFooter({
                    text: `${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL(),
                  })
                  .setThumbnail(interaction.user.displayAvatarURL())
                  .setDescription(
                    `❌・Você **já tem um ticket** aberto em: ${existingChannel}, você não pode comprar esse produto 2 vezes apenas 1, os clientes precisa aproitar a promoção também :D!`
                  ),
              ],
              ephemeral: true,
            });
          } else {
            // Diminuir o limite e atualizar o JSON
          produto.limite--;
          const dadosJSON = JSON.stringify(dadosExistente, null, 2);
          fs.writeFileSync(caminhoArquivo, dadosJSON, 'utf-8');
            interaction.guild.channels
              .create({
                name: `🛒・${produto.nome}`,
                topic: `💌 criador do carrinho <@${userId}> id: ${userId}, caso queira comprar um rôbo assim ou diferente com outras funções clique em: https://abre.ai/ronieremarques #${userId}&${messageId}`,
                parent: `1151157022805459114`,
                permissionOverwrites: [
                  {
                    id: interaction.guildId,
                    deny: [
                      Discord.PermissionFlagsBits.ViewChannel,
                      Discord.PermissionFlagsBits.CreatePublicThreads,
                      Discord.PermissionFlagsBits.CreatePrivateThreads,
                      Discord.PermissionFlagsBits.SendMessagesInThreads,
                      Discord.PermissionFlagsBits.UseApplicationCommands,
                    ],
                  },
                  {
                    id: interaction.user.id,
                    allow: [
                      Discord.PermissionFlagsBits.ViewChannel,
                      Discord.PermissionFlagsBits.SendMessages,
                    ],
                  },
                ],
              })
              .then((ch) => {
                // Caminho para o arquivo JSON
                const caminhoArquivo = "channels.json";

                // IDs a serem verificados e adicionados
                const novoIDUsuario = interaction.user.id;
                const novoIDCanal = ch.id;

               // Ler o conteúdo atual do arquivo
  const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
  
  // Converter o conteúdo para um objeto JavaScript
  const data = JSON.parse(conteudoArquivo);
  
  // Adicionar o novo ID de usuário ao objeto
  data[novoIDUsuario] = { id: novoIDUsuario, channel_id: novoIDCanal };
    
  // Converter de volta para JSON
  const novoConteudo = JSON.stringify(data, null, 2);

  // Escrever o novo conteúdo no arquivo
  fs.writeFileSync(caminhoArquivo, novoConteudo, 'utf-8');
                interaction.reply({
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setColor('Green')
                      .setTimestamp()
                      .setTitle(`${interaction.guild}`)
                      .setFooter({
                        text: `${interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL(),
                      })
                      .setDescription(
                        `✅・Seu **ticket** foi aberto em: ${ch}, clique no **botão** abaixo para ir até ele, dica: paga pelo produto para assim quando o vendedor estiver online possa te mandar direto!`
                      )
                      .setThumbnail(interaction.user.displayAvatarURL()),
                  ],
                  components: [
                    new Discord.ActionRowBuilder().addComponents(
                      new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL(
                          `https://discord.com/channels/${interaction.guild.id}/${ch.id}`
                        )
                        .setLabel("Ir até o ticket!")
                    ),
                  ],
                  ephemeral: true,
                });

                ch.send({
                  allowedMentions: { users: ['1146549621141811262'] },
                  content: `<@&1146549621141811262>`,
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setColor('Red')
                      .setTitle(`${interaction.guild}`)
                      .setFooter({
                        text: "Aguarde enquanto o bruno possa atender você!",
                        iconURL: interaction.user.displayAvatarURL(),
                      })
                      .setDescription(
                        `Olá <@&1146549621141811262> queria aproveitar a promoção \`${produto.nome}\`, aguardo você mim responder, Dica: você pode adiantar-se é pagar logo para que quando ele estiver disponivel já manda seu produto, para isso você pode clicar em \`pagar\` no botão abaixo.`
                      )
                      .setThumbnail(
                        interaction.user.displayAvatarURL({ dynamic: true })
                      ),
                  ],
                  components: [
                    new Discord.ActionRowBuilder().addComponents(
                      new Discord.ButtonBuilder()
                        .setLabel("pagar")
                        .setEmoji('💸')
                        .setStyle(Discord.ButtonStyle.Danger)
                        .setCustomId("generete-payments")
                    ),
                  ],
                }).then((m) => {
                  m.pin();
                  m.channel.send({
                  allowedMentions: { users: [interaction.user.id] },
                  content: `<@${interaction.user.id}>`,
                    embeds: [
                      new Discord.EmbedBuilder()
                        .setColor('Yellow')
                        .setThumbnail(
                          "https://media.discordapp.net/attachments/1142885479134531684/1142969756299833354/Design_sem_nome-removebg-preview.png?width=32&height=32"
                        )
                        .setDescription(
                          `🔔・Foi enviado um alerta a <@&1146549621141811262> que você está esperando ele nesse ticket de compra, espere ele o responder.`
                        ),
                    ],
                  });
                });
              })
              .catch(async (err) => {
                interaction.reply({
                  content: `Ouve um erro: ${err} lembre-se de configurar tudo!`,
                  ephemeral: true,
                });
              });
          }
        }
        break; // Encerra o loop após encontrar o produto
      }
    }
  }
});
