import { BarsService } from 'database/service/bars.service.js';
import { Command } from "#base";
import { PlayerService } from "database/service/player.service.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
  name: "arquetype",
  description: "Adicona um arquetipo para seu personagem",
  type: ApplicationCommandType.ChatInput,
  options: [
      {
          name: "value",
          description: "Tipo de arquetipo",
          type: ApplicationCommandOptionType.String,
          required
      }
  ],
  async run(interaction){
      const { member, options } = interaction

      await interaction.reply({ ephemeral, content: "Carregando sua solicitação..." })

      const value = options.getString("value")
      if(!value) { return }

      const service = new PlayerService()
      const response = await service.findOne(member.id)
      if(!response.player) { return }

      const barsService = new BarsService()
      const res = await barsService.setArquetype(response.player, value)

      if(res === 404) { interaction.editReply(`Não encontramos o arquétipo: **${value}**`) }
      if(res === 200 ) { interaction.editReply("Concluído!") }
  }
});