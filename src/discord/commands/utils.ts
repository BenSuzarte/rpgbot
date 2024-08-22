import { ApplicationCommandOptionData, ApplicationCommandOptionType } from "discord.js";

export const StatusOptions: ApplicationCommandOptionData = {
  name: "status",
  description: "Define os primeiros status",
  type: ApplicationCommandOptionType.Subcommand,
  options: [
    {
      name: "first",
      description: "Seleciona um status",
      type: ApplicationCommandOptionType.String,
      required
    },
    {
      name: "second",
      description: "Seleciona um status",
      type: ApplicationCommandOptionType.String,
      required
    }
  ]
}