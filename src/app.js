require("dotenv").config()
const { readdirSync } = require("fs")
const { Client, GatewayIntentBits, Collection } = require("discord.js")

const MrMemer = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] })

MrMemer.login(process.env.DISCORD_BOT_TOKEN)

// commands
const COMMAND_FILES = readdirSync("./src/commands").filter(file => file.endsWith(".js"))

const commands = []
MrMemer.commands = new Collection()

COMMAND_FILES.forEach(file => {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
  MrMemer.commands.set(command.data.name, command)
})

// events
const EVENT_FILES = readdirSync("./src/events").filter(file => file.endsWith(".js"))

EVENT_FILES.forEach(file => {
  const event = require(`./events/${file}`)
  if (event.once) {
    MrMemer.once(event.name, (...args) => event.execute(...args, commands))
  } else {
    MrMemer.on(event.name, (...args) => event.execute(...args))
  }
})
