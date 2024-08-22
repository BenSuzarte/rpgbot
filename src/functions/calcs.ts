export function setMaxHealth(vigor: number, level: number) {
  return ( 5 * vigor ) + level
}

export function setMaxEnergy(presence: number, level: number) {
  return ( 4 * presence ) + level
}

export function transformStatusPoints(value: string) {
  switch (value) {
    case "força":
      return "strength"
    case "agilidade":
      return "agility"
    case "presença":
      return "presence"
    case "inteligência":
      return "intelligence"
    case "vigor":
      return "vigor"
    default:
      return null
  }
}