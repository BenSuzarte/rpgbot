import { Responder, ResponderType } from "#base";
import { menus } from "#menus";
import { NewPlayerDTO } from "database/dto/player.js";
import { PlayerService } from "database/service/player.service.js";
import { newPlayerModal } from "modals/index.js";

new Responder({
    customId: "form/newplayer",
    type: ResponderType.Modal, cache: "cached",
    async run(interaction) {

        await interaction.reply({ ephemeral, content: "Estou gerando seu personagem..." })

        const { fields, member } = interaction;

        const newPlayer: NewPlayerDTO = {
            id: member.id,
            name: fields.getTextInputValue("name"),
            age: Number(fields.getTextInputValue("age")),
            imageUrl: fields.getTextInputValue("imageUrl"),
            lore: fields.getTextInputValue("lore")
        }

        const service = new PlayerService()
        const player = await service.new(newPlayer)

        interaction.editReply(menus.playerCharacter(player, interaction.member))

    },
});

new Responder({
    customId: "form/newplayer",
    type: ResponderType.Button, cache: "cached",
    async run(interaction) {
        interaction.showModal(newPlayerModal())
    }
});