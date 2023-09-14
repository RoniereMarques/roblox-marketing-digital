const Discord = require("discord.js")
const config = require("./config.json")
const fs = require('fs')
const client = new Discord.Client({
  intents: [ 
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildModeration,
    Discord.IntentsBitField.Flags.GuildIntegrations,
    Discord.IntentsBitField.Flags.GuildWebhooks,
    Discord.IntentsBitField.Flags.GuildInvites,
    Discord.IntentsBitField.Flags.GuildVoiceStates,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.GuildPresences,
    Discord.IntentsBitField.Flags.GuildMessageReactions,
    Discord.IntentsBitField.Flags.GuildMessageTyping,
    Discord.IntentsBitField.Flags.DirectMessages,
    Discord.IntentsBitField.Flags.DirectMessageReactions,
    Discord.IntentsBitField.Flags.DirectMessageTyping,
    Discord.IntentsBitField.Flags.MessageContent
  ],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember
  ]
})
require('./handlers')(client)
// exportando o cliente para outras pastas.
module.exports = client
// bloqueia o app de parar se ouver erro no console 'catch'.
process.on('uncaughtException', (err, origin) => { console.log(err, origin) })
// slash commands Discord.js@14.0.1
client.slashCommands = new Discord.Collection()
client.login(config.token)
fs.readdir('./events', (err, file) => {
  file.forEach(event => {
    require(`./events/${event}`)
  })
})