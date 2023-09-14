const Discord = require('discord.js')
const fs = require('fs')
const client = require('../index.js')

client.on('messageDelete', async (message) => {
  // Caminho para o arquivo JSON existente
  const caminhoArquivo = "estoques.json";
  // Lê o conteúdo atual do arquivo
  const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');
  const dadosExistente = JSON.parse(conteudoArquivo);

  for (const categoria in dadosExistente) {
    const campos = dadosExistente[categoria];
    if (campos.messageId === message.id) {
      // Remove a categoria completa
      delete dadosExistente[categoria];
      break; // Pode parar após encontrar a categoria correspondente
    }
  }

  // Converte os dados atualizados para JSON
  const dadosJSON = JSON.stringify(dadosExistente, null, 2);

  // Escreve os dados de volta no arquivo, substituindo o conteúdo anterior
  fs.writeFileSync(caminhoArquivo, dadosJSON, 'utf-8');

});