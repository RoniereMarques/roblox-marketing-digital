const Discord = require("discord.js");
const fs = require("fs");
// Lê o arquivo permitidos.json
const rawdata = fs.readFileSync('permitidos.json');
const idsPermitidos = JSON.parse(rawdata);
// Obtém os valores dos IDs permitidos
const valoresPermitidos = Object.values(idsPermitidos);

module.exports = {
  name: "promoção", // Coloque o nome do comando
  description: "publicar uma promoção", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "mencionar",
      description: "Quem você quer notificar nessa mensagem?",
      type: Discord.ApplicationCommandOptionType.Role,
      required: true,
    }
  ],

  run: async (client, interaction) => {
    const cargo = interaction.options.getRole("mencionar");
    // verifica se quem usou o comando tem permissão
    if (!valoresPermitidos.includes(interaction.user.id))
      return interaction.reply({
        content: `apenas os criadores do rôbo tem a permissão de usar esse comando, caso queira a permissão também solicite ao <@738812418532180062>, <@998145146430439469> & <@738812418532180062>, compre esse rôbo em: https://abre.ai/ronieremarques`,
        ephemeral: true,
      });
    const modal = new Discord.ModalBuilder()
      .setCustomId("create-promotions")
      .setTitle("blox fruits community");

    const promocion_1 = new Discord.TextInputBuilder()
      .setCustomId("promotions-value")
      .setLabel("Qual será o valor:")
      .setRequired(true)
      .setMinLength(1)
      .setStyle(Discord.TextInputStyle.Short)
      .setPlaceholder(
        "Digite apenas o valor por exemplo: 10, no caso seria 10 reais o produto."
      );

    const promocion_2 = new Discord.TextInputBuilder()
      .setCustomId("promotions-limite")
      .setLabel("Quantas pessoas podem comprar:")
      .setRequired(true)
      .setMaxLength(3)
      .setStyle(Discord.TextInputStyle.Short)
      .setPlaceholder(
        "exemplo: 1, 2, 100. Se por 1 apenas uma pessoa pode comprar."
      );

    const promocion_3 = new Discord.TextInputBuilder()
      .setCustomId("promotions-descritions")
      .setLabel("QUAL SERÁ A DESCRIÇÂO:")
      .setRequired(true)
      .setStyle(Discord.TextInputStyle.Paragraph)
      .setPlaceholder(
        "exemplo: ups de contas por um preço abaixo do normal, adianta logo que essa promoção tem um limite."
      );

    const promocion_4 = new Discord.TextInputBuilder()
      .setCustomId("promotions-name")
      .setLabel("Qual é o nome do produto:")
      .setRequired(true)
      .setStyle(Discord.TextInputStyle.Short)
      .setPlaceholder("exemplo: Up de contas, gamepass, frutas.");

    modal.addComponents(
      new Discord.ActionRowBuilder().addComponents(promocion_1),
      new Discord.ActionRowBuilder().addComponents(promocion_2),
      new Discord.ActionRowBuilder().addComponents(promocion_3),
      new Discord.ActionRowBuilder().addComponents(promocion_4)
    );

    await interaction.showModal(modal);

    const modalresponse = await interaction.awaitModalSubmit({
      filter: (i) => i.user.id === interaction.user.id,
      time: 691200_000,
    });
    const valor = modalresponse.fields.getTextInputValue(`promotions-value`);
    const limite = modalresponse.fields.getTextInputValue(`promotions-limite`);
    const descrição = modalresponse.fields.getTextInputValue(
      `promotions-descritions`
    );
    const nome = modalresponse.fields.getTextInputValue(`promotions-name`);
    if (limite < 1) return modalresponse.reply({ content: `O limite não pode ser menor que 1 no caso 0, se não quer vender nada não crie uma promoção /:`, ephemeral: true });
    await modalresponse.reply({ content: `Promoção criada, com sucesso.`, ephemeral: true })
    await modalresponse.channel.send({
        content: `🔥 - ${cargo} tem promoção aqui!`,
        embeds: [
          new Discord.EmbedBuilder()
            .setAuthor({ name: 'Promoção Relâmpago - blox fruits community', iconURL: 'https://cdn.discordapp.com/attachments/1058174986189295656/1151222244970877108/standard6.gif' })
            .setTimestamp()
            .addFields(
              { name: '**🛒 Produto**:', value: `\`\`\`${nome}\`\`\``, inline: true },
              { name: '**💸 Preço**:', value: `\`\`\`R$ ${valor}\`\`\``, inline: true },
              { name: '**📦 Descrição**:', value: `\`\`\`${descrição}\`\`\``, inline: false },
            )
            .setColor("Red")
        ],
        components: [
          new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setStyle(Discord.ButtonStyle.Danger)
              .setCustomId("btn-sales")
              .setEmoji("<:Carrinho_WJ:1139361347633692723>")
              .setLabel("Comprar")
              .setDisabled(false)
          ),
        ],
      })
      .then(async (success) => {
        // Caminho para o arquivo JSON existente
        const caminhoArquivo = "estoques.json";

        // Novos campos que você deseja adicionar
        const novosCampos = {
          nome: nome,
          descricao: descrição,
          valor: valor,
          limite: Number(limite),
          messageId: success.id,
          channelId: success.channelId
        };

        // Lê o conteúdo atual do arquivo
        const conteudoArquivo = fs.readFileSync(caminhoArquivo, "utf-8");

        // Converte o conteúdo lido para um objeto JavaScript
        const dadosExistente = JSON.parse(conteudoArquivo);

        // Função para adicionar uma nova categoria com nome único
        function adicionarNovaCategoria(categoria, campos) {
          let novaCategoria = categoria;
          let contador = 1;

          while (dadosExistente[novaCategoria] !== undefined) {
            novaCategoria = `${categoria}${contador}`;
            contador++;
          }

          dadosExistente[novaCategoria] = campos;
        }

        // Adiciona a nova categoria aos dados existentes
        adicionarNovaCategoria("product", novosCampos);

        // Converte os dados atualizados para JSON
        const dadosJSON = JSON.stringify(dadosExistente, null, 2);

        // Escreve os dados de volta no arquivo, substituindo o conteúdo anterior
        fs.writeFileSync(caminhoArquivo, dadosJSON, "utf-8");
      });
  },
};
