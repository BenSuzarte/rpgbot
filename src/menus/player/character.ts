import { settings } from "#settings";
import { brBuilder, createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord";
import { Player } from "database/entities/player.entity.js";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js";

export function PlayerCharacterMenu(player: Player, member: GuildMember) {

  const embed = createEmbed({
    author: createEmbedAuthor(member),
    color: settings.colors.primary,
    title: "Informações do Personagem",
    thumbnail: player.imageUrl,
    description: brBuilder(
      `# ${player.name}, ${player.age} anos`,
      `**Rank: ${player.rank} |  Level: ${player.level} | Experiência: ${player.exp}xp**`,
      `**Saldo**: ${player.balance}¥`,
      "",
      `${player.lore}`
    ),
  })

  const row = createRow(
    new ButtonBuilder({
      customId: "player/status",
      label: "Status",
      style: ButtonStyle.Success
    }),
    new ButtonBuilder({
      customId: "player/waepons",
      label: "Infos",
      style: ButtonStyle.Secondary,
    }),
    new ButtonBuilder({
      customId: "player/about",
      label: "Atualizar",
      style: ButtonStyle.Secondary
    })
  )

  return { ephemeral, embeds: [embed], components: [row], content: "Opa... Está aqui o seu personagem!" }
}