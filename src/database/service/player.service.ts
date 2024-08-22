import { StatusService } from './status.service.js';
import { AppDataSource } from "database/data-source.js";
import { NewPlayerDTO, PlayerRanks } from "database/dto/player.js";
import { Player } from "database/entities/player.entity.js";
import { PlayerStatus } from 'database/entities/status.entity.js';
import { Repository } from "typeorm";
import { BarsService } from './bars.service.js';

export class PlayerService {

  private readonly repository: Repository<Player>
  constructor() { this.repository = AppDataSource.getRepository(Player) }

  async new(player: NewPlayerDTO) {
    const statusService = new StatusService()

    const newPlayer = await this.build(player)
    const status = await statusService.build(newPlayer)

    newPlayer.status = status;

    return await this.repository.save(newPlayer)
  }

  async getStatus(player: Player): Promise<PlayerStatus | null> {
    const playerWithStatus = await this.repository.findOne({
      where: { id: player.id },
      relations: ["status"]
    });
  
    return playerWithStatus ? playerWithStatus.status : null;
  }

  async findOne(userId: string) {
    try {
      const player = await this.repository.findOne({ where: { id: userId } })
      if(!player) {
        return { status: 404 }
      }

      return { status: 200, player }
    } catch (error) {
      return { status: 500 }
    }
  }

  private async build(player: NewPlayerDTO) {
    return this.repository.create({
      id: player.id,
      name: player.name,
      age: player.age,
      imageUrl: player.imageUrl,
      lore: player.lore,
    })
  }

  async levelUp(player: Player, xp: number) {
    
    const { id, level, rank } = player
    
    await this.repository.increment({ id }, 'exp', xp)

    const updatedPlayer = await this.repository.findOne({ where: { id } })
    if(!updatedPlayer) { return }

    let experience = updatedPlayer.exp;
    let counterExp = 0

    while (experience >= 10) {
      counterExp++
      experience -= 10;
    }

    if(counterExp > 0) { 

      await this.repository.update({ id }, { exp: experience })

      const barsService = new BarsService()
      await barsService.levelup(player)

      let counterLevel = 0
      let lvl = ( level + counterExp )

      while (lvl >= 4) {
        counterLevel++
        lvl -= 4;
      }

      if(counterLevel >= 1) {

        const i = PlayerRanks.indexOf(rank)
        const currentRank = PlayerRanks[i+1]

        await this.repository.update({ id }, { level: 1 });
        await this.repository.update({ id }, { rank: currentRank });

      } else {
        await this.repository.update({ id }, { level: lvl });
      }

    }
  }

  async setMoney(player: Player, type: string, value: number) {
    switch (type) {
      case "increase":
        this.repository.increment({ id: player.id }, 'balance', value)
        break;
      case "decrease":
        this.repository.decrement({ id: player.id }, 'balance', value)
        break;
    }
  }

}