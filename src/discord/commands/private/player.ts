import { Command } from "#base";
import { menus } from "#menus";
import { PlayerService } from "database/service/player.service.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";

new Command({
    name: "player",
    description: "Informações do Jogador",
    type: ApplicationCommandType.ChatInput,
    async run(interaction){
        const { member } = interaction;
        const service = new PlayerService();

        await interaction.reply({ content: "Procurando seu personagem..." });
        const response = await service.findOne(member.id);

        const { player } = response;
        if(!player) {
            interaction.editReply(menus.playerNotFound());
            return;
        }

        switch(response.status){
            case 200:
                interaction.editReply(menus.playerCharacter(player, member));
                return;

            case 500:
                interaction.editReply("Estamos passando por problemas no momento...")
                return;
        }
    }
});

new Command({
    name: "levelup",
    description: "Adicona o xp ganho após a luta",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "exp",
            description: "Valor do xp ganho",
            type: ApplicationCommandOptionType.Integer,
            required
        }
    ],
    async run(interaction){

        await interaction.reply({ ephemeral, content: "Estamos trabalhando nisto..." })

        const { member, options } = interaction;

        const exp = options.getInteger("exp")
        if(!exp) { return }

        const service = new PlayerService()
        const response = await service.findOne(member.id);

        const { player } = response;
        if(!player) {
            interaction.editReply(menus.playerNotFound());
            return;
        }

        await service.levelUp(player, exp)
        interaction.editReply("Alteração realizada com sucesso!")
    }
});