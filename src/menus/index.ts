import { PlayerCharacterMenu } from "./player/character.js";
import { PlayerNotFound } from "./player/notfound.js";
import { PlayerStatusMenu } from "./player/status.js";

export const menus = {
  playerNotFound: PlayerNotFound,
  playerCharacter: PlayerCharacterMenu,
  playerStatus: PlayerStatusMenu
}