import { Responder, ResponderType } from "#base";
import { menus } from "#menus";
import { PlayerService } from "database/service/player.service.js";

new Responder({
  customId: "player/about",
  type: ResponderType.Button, cache: "cached",
  async run(interaction) {

    await interaction.deferUpdate()

    const { member } = interaction

    const service = new PlayerService();
    const response = await service.findOne(member.id);

    const { player } = response;
    if(!player) {
        interaction.editReply(menus.playerNotFound());
        return;
    }

    interaction.editReply(menus.playerCharacter(player, member))
  },
});