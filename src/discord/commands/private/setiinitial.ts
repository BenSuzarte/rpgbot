import { Command } from "#base";
import { ApplicationCommandType } from "discord.js";
import { StatusOptions } from "../utils.js";
import { StatusService } from "database/service/status.service.js";
import { PlayerService } from "database/service/player.service.js";
import { transformStatusPoints } from "#functions";

new Command({
  name: "setintials",
  description: "Define os status iniciais do player",
  type: ApplicationCommandType.ChatInput,
  options: [StatusOptions],
  async run(interaction){

    await interaction.reply({ ephemeral, content: "Carregando sua solicitação..." })

    const { member, options } = interaction
    const statusService = new StatusService();
    const playerService = new PlayerService();

    const response = await playerService.findOne(member.id)
    if(!response.player) { return }

    const status = await playerService.getStatus(response.player)
    if(!status) { return }

    switch (options.getSubcommand(true)) {
      case "status":
        const first = options.getString("first", required);
        const second = options.getString("second", required);

        const one = transformStatusPoints(first)
        const two = transformStatusPoints(second)

        if(!one || !two) {
          return
        }

        statusService.setInitials(status, one, two)
    }

    interaction.editReply("Atualização feita com sucesso!")
  }
});