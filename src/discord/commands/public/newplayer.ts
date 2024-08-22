import { Command } from "#base";
import { PlayerService } from "database/service/player.service.js";
import { ApplicationCommandType } from "discord.js";
import { newPlayerModal } from 'modals/index.js';

new Command({
	name: "newplayer",
	description: "cria um novo jogador",
	type: ApplicationCommandType.ChatInput,
	async run(interaction){

		const service = new PlayerService();
		const response = await service.findOne(interaction.member.id)

		if(response.status === 200) {
			interaction.reply({ephemeral, content: "Você já possui um personagem! Digite `/player` para acessá-lo."})
			return
		}

		interaction.showModal(newPlayerModal())
	}
});