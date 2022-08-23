require("dotenv").config()
const { Routes } = require("discord.js")
const { REST } = require("@discordjs/rest")

const event = {
  name: "ready",
  once: true,
  execute(client, commands) {
    console.log(`${client.user.tag} has logged in!!`)
    registerCommands(commands)
  },
}

const registerCommands = async commands => {
  const CLIENT_ID = process.env.CLIENT_ID
  const GUILD_ID = process.env.GUILD_ID

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_BOT_TOKEN)

  try {
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
    console.log("Commands registered successfully!!")
  } catch (error) {
    console.log(error)
  }
}

module.exports = event
