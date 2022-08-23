const event = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (!interaction.isCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) return

    try {
      await command.execute(interaction)
    } catch (error) {
      console.log(`[ERROR] - ${error}`)
      interaction.reply({
        content: "Internal server error!!",
        ephemeral: true,
      })
    }
  },
}

module.exports = event
