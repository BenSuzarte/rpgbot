import { settings } from "#settings"
import { brBuilder, createEmbed, createEmbedAuthor, createRow } from "@magicyan/discord"
import { Energy } from "database/entities/energy.entity.js";
import { Health } from "database/entities/health.entity.js";
import { Player } from "database/entities/player.entity.js";
import { PlayerStatus } from "database/entities/status.entity.js";
import { ButtonBuilder, ButtonStyle, GuildMember } from "discord.js"

export function PlayerStatusMenu(
  member: GuildMember, 
  player: Player, 
  status: PlayerStatus,
  health: Health,
  energy: Energy
) {

  const healthBar = generateBars(30, health.current, health.max);
  const energyBar = generateBars(30, energy.current, energy.max);

  const bg = "```";

  const embed = createEmbed({
    author: createEmbedAuthor(member),
    title: "Informações do Personagem",
    color: settings.colors.green,
    thumbnail: player.imageUrl,
    description: brBuilder(
      `# Status`,
      `### ${player.name}`,
      "**Barras**",
      `${healthBar} **Vida**`,
      `${energyBar} **Energia**\n`,
      "**Pontos**",
      `${bg}| Vigor ----------- | D${status.vigor} |`,
      `| Força ----------- | D${status.strength} |`,
      `| Presença -------- | D${status.presence} |`,
      `| Agilidade ------- | D${status.agility} |`,
      `| Inteligência ---- | D${status.intelligence} |\n`,
      `| Armadura -------- | ${status.armor} |\n`,
      `| E. Natural ------ | ${energy.natural} |`,
      `| E. Espiritual --- | ${energy.spiritual} |${bg}`
    )
  })

  const row = createRow(
    new ButtonBuilder({
      customId: "player/about",
      label: "Sobre",
      style: ButtonStyle.Primary
    }),
    new ButtonBuilder({
      customId: "player/waepon",
      label: "Infos",
      style: ButtonStyle.Secondary
    }),
    new ButtonBuilder({
      customId: "player/status",
      label: "Atualizar",
      style: ButtonStyle.Secondary
    })
  )

  return { ephemeral, embeds:  [embed], components: [row], coontent: "Serviço de status atendido com sucesso! ;3" }
}

function generateBars(fillable: number, current: number, max: number) {
  let bar = "`|"
  const bars = Math.round((fillable * current) / max);
  for (let index = 0; index < fillable; index++) {
    if(index < (bars - 1)) {
      bar += "█";
    } else if(index < (fillable - 1)) {
      bar += "-";
    }
  }
  return bar += `| ${current}/${max}` + "`"
}