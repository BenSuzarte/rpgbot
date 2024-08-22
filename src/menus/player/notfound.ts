import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function PlayerNotFound() {
  const embed = createEmbed({
    color: settings.colors.danger,
    description: brBuilder(
      "Digite `/newplayer` ou acesse o botão abaixo para participar do RPG."
    )
  })

  const row = createRow(
    new ButtonBuilder({
      customId: "form/newplayer",
      label: "Novo Jogador",
      style: ButtonStyle.Success
    }),
  )

  return { ephemeral, embeds: [embed], components: [row], content: "**Vi que você ainda não possui um personagem!**" }
}