import { Command } from "#base";
import { PlayerService } from "database/service/player.service.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
  name: "money",
  description: "Modifica sua quantia de dinheiro",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "increase",
      description: "Adiciona dinheiro a sua conta",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "value",
          description: "Digia a quantia a ser adicionada",
          type: ApplicationCommandOptionType.Number,
          required
        }
      ],
    },
    {
      name: "decrease",
      description: "Retira dinheiro a sua conta",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "value",
          description: "Digia a quantia a ser retirada",
          type: ApplicationCommandOptionType.Number,
          required
        }
      ]
    }
  ],
  async run(interaction){
    const { member, options } = interaction
    const value = options.getNumber("value")
    const type = options.getSubcommand()

    if(!value) { return }

    const playerService = new PlayerService()
    const response = await playerService.findOne(member.id)
    if(!response.player) { return }

    playerService.setMoney(response.player, type, value)
  }
});