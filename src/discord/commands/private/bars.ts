import { Command } from "#base";
import { BarsService } from "database/service/bars.service.js";
import { PlayerService } from "database/service/player.service.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "health",
    description: "Modifica sua saúde",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "heal",
        description: "Cura a barra de vida",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "value",
            description: "Valor da cura",
            type: ApplicationCommandOptionType.Number,
            required
          }
        ]
      },
      {
        name: "damage",
        description: "Diminui a barra de vida",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "value",
            description: "Valor do dano",
            type: ApplicationCommandOptionType.Number,
            required
          }
        ]
      }
    ],
    async run(interaction){
      const { member, options } = interaction

      await interaction.reply({ ephemeral, content: "Carregando sua solicitação..." })

      const playerService = new PlayerService()

      const response = await playerService.findOne(member.id)
      if(!response.player) { return }

      const status = await playerService.getStatus(response.player)
      if(!status) { return }

      const type = options.getSubcommand()
      const value = options.getNumber("value")
      if(!value) { return }

      const barsService = new BarsService()

      switch (type) {
        case "heal":
          await barsService.heal(status, "health", value)
          break;
        case "damage":
          await barsService.damage(status, "health", value)
          break;
      }

      interaction.editReply("Alterado com sucesso!")

    }
});

new Command({
  name: "energy",
  description: "Modifica sua energia",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "heal",
      description: "Restaura a barra de energia",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "value",
          description: "Valor da restauração",
          type: ApplicationCommandOptionType.Number,
          required
        }
      ]
    },
    {
      name: "damage",
      description: "Consome parte da energia",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "value",
          description: "Valor do consumo",
          type: ApplicationCommandOptionType.Number,
          required
        }
      ]
    }
  ],
  async run(interaction){
    const { member, options } = interaction

      await interaction.reply({ ephemeral, content: "Carregando sua solicitação..." })

      const playerService = new PlayerService()

      const response = await playerService.findOne(member.id)
      if(!response.player) { return }

      const status = await playerService.getStatus(response.player)
      if(!status) { return }

      const type = options.getSubcommand()
      const value = options.getNumber("value")
      if(!value) { return }

      const barsService = new BarsService()

      switch (type) {
        case "heal":
          await barsService.heal(status, "energy", value)
          break;
        case "damage":
          await barsService.damage(status, "energy", value)
          break;
      }

      interaction.editReply("Alterado com sucesso!")

    }
  }
);