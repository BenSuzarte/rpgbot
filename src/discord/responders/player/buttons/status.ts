import { Responder, ResponderType } from "#base";
import { menus } from "#menus";
import { PlayerService } from "database/service/player.service.js";
import { StatusService } from "database/service/status.service.js";

new Responder({
  customId: "player/status",
  type: ResponderType.Button, cache: "cached",
  async run(interaction) {
    const { member } = interaction;

    await interaction.deferUpdate()
    
    const playerService = new PlayerService()
    const statusService = new StatusService()

    const response = await playerService.findOne(member.id)
    if(!response.player) { return }

    const status = await playerService.getStatus(response.player)
    if(!status) { return }

    const bars = await statusService.getBars(status)
    if(!bars) { return }

    interaction.editReply(menus.playerStatus(
      member,
      response.player,
      status,
      bars.health,
      bars.energy
    ))
  },
});