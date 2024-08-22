import { createModalInput } from "@magicyan/discord";
import { ModalBuilder, TextInputStyle } from "discord.js";
import { z } from "zod";

const zNewPlayerSchema = z.object({
  name: z.string().min(2, "É necessário um nome de dois ou mais caracteres!"),
  age: z.coerce.number({ invalid_type_error: "A idade deve ser um número!" })
  .min(15, "Idade informada invállida!"),
  imageUrl: z.string(),
  lore: z.string()
});

type NewPlayerSchema = z.infer<typeof zNewPlayerSchema>;

export function newPlayerModal(
  data: Partial<Record<keyof NewPlayerSchema, string>> = {}
) {
  return new ModalBuilder({
    customId: `form/newplayer`,
    title: "Novo Personagem",
    components: [
      createModalInput({
        customId: "name",
        value: data.name,
        label: "Nome",
        placeholder: "Nome do personagem",
        style: TextInputStyle.Short,
        required
      }),
      createModalInput({
        customId: "age",
        value: data.age,
        label: "Idade",
        placeholder: "18",
        style: TextInputStyle.Short,
        required
      }),
      createModalInput({
        customId: "imageUrl",
        value: data.imageUrl,
        label: "Imagem",
        placeholder: "Cole a URL da imagem",
        style: TextInputStyle.Short,
        required
      }),
      createModalInput({
        customId: "lore",
        value: data.lore,
        label: "História",
        placeholder: "Escreva ou cole a história do seu personagem...",
        style: TextInputStyle.Paragraph,
        required
      }),
    ],
  })
}