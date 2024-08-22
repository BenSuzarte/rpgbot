import { StatusService } from 'database/service/status.service.js';
import { Command } from "#base";
import { menus } from "#menus";
import { PlayerService } from "database/service/player.service.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { transformStatusPoints } from '#functions';

new Command({
  name: "status",
  description: "Visualiza o estado atual do jogador",
  type: ApplicationCommandType.ChatInput,
  async run(interaction){
    const { member } = interaction;
    
    const playerService = new PlayerService()
    const statusService = new StatusService()

    const response = await playerService.findOne(member.id)
    if(!response.player) { return }

    const status = await playerService.getStatus(response.player)
    if(!status) { return }

    const bars = await statusService.getBars(status)
    if(!bars) { return }

    interaction.reply(menus.playerStatus(
      member,
      response.player,
      status,
      bars.health,
      bars.energy
    ))
  }
});

new Command({
  name: "up",
  description: "Adicona dois pontos a um status",
  type: ApplicationCommandType.ChatInput,
  options: [
      {
          name: "status",
          description: "Status desejado",
          type: ApplicationCommandOptionType.String,
          required
      }
  ],
  async run(interaction){
      const { member, options } = interaction

      await interaction.reply({ ephemeral, content: "Carregando sua solicitação..." })

      const service = new PlayerService()
      const response = await service.findOne(member.id)
      if(!response.player) { return }

      const value = options.getString("status")
      if(!value) { return }

      const statusType = transformStatusPoints(value)

      const statusService = new StatusService();
      const status = await service.getStatus(response.player)
      if(!status || !statusType) { return }

      await statusService.upPoints(response.player, status, statusType)

      interaction.editReply("Concluído!")
  }
});