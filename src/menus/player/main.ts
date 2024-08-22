import { settings } from "#settings";
import { brBuilder, createEmbed, createRow } from "@magicyan/discord";
import { Player } from "database/entities/player.entity.js";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";

export function PlayerMainMenu(member: GuildMember, player: Player) {
  const embed = createEmbed({
    thumbnail: member.displayAvatarURL(),
    color: settings.colors.green,
    description: brBuilder(
      `# ${player.name}, ${player.age}y`
    )
  })

  const row = createRow(
    new ButtonBuilder({
      custom_id: "player/chacarter",
      label: "Infos",
      style: ButtonStyle.Primary
    }),
    new ButtonBuilder({
      custom_id: "player/status",
      label: "Status",
      style: ButtonStyle.Success
    })
  )
  
  return { ephemeral, embeds: [embed], components: [row], content: "Opa... Achei seu personagem!" }
}