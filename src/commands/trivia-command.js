require("dotenv").config()
const { default: axios } = require("axios")
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const command = {
  data: new SlashCommandBuilder().setName("trivia").setDescription("asks the user trivia questions!!"),
  async execute(interaction) {
    try {
      const validChannelID = process.env.TRIVIA_CH_ID
      if (validChannelID !== interaction.channelId) {
        interaction.reply({ content: "❌ CANNOT USE THIS HERE ❌", ephemeral: true })
        return
      }

      const channel = interaction.guild.channels.cache.get(validChannelID)

      const response = await axios.get(process.env.TRIVIA_API_URL)
      const trivia = await response.data.results[0]

      const { category, question, difficulty } = trivia.question
      const correctAnswer = trivia.correct_answer
      // const options = getRandomlyPlacedOptions([...trivia.incorrect_answers, correctAnswer])

      const triviaEmbed = new EmbedBuilder().setTitle("hello").setDescription("ser").setFields({
        name: "ak",
        value: "akjwe",
      })
      interaction.reply({ embeds: [triviaEmbed] })
    } catch (error) {
      console.log(error)
    }
  },
}

const getRandomlyPlacedOptions = optionsArray => {
  const randomIndexes = []
  const finalArray = []

  while (randomIndexes.length !== 4) {
    const randomIndex = Math.floor(Math.random() * optionsArray.length)
    if (randomIndexes.includes(randomIndex)) continue

    randomIndexes.push(randomIndex)
    finalArray.push(optionsArray[randomIndex])
  }

  return finalArray
}

module.exports = command
