import { AppDataSource } from "database/data-source.js"
import { PlayerStatus } from "database/entities/status.entity.js"
import { Repository } from "typeorm"
import { BarsService } from "./bars.service.js"
import { Player } from "database/entities/player.entity.js"
import { Health } from "database/entities/health.entity.js"
import { Energy } from "database/entities/energy.entity.js"
import { UpdateStatusValues } from "database/dto/status.js"
import { setMaxEnergy, setMaxHealth } from "#functions"

export class StatusService {

  private readonly repository: Repository<PlayerStatus>
  constructor() { this.repository = AppDataSource.getRepository(PlayerStatus) }

  async build(player: Player) {
    const barsService = new BarsService()

    const statusCreate = this.repository.create({
      player: player,
    })

    const response = await barsService.build(statusCreate)

    statusCreate.health = response.health
    statusCreate.energy = response.energy

    return await this.repository.save(statusCreate)

  }

  async getBars(status: PlayerStatus): Promise<{ health: Health, energy: Energy } | null> {
    const statusHealth = await this.repository.findOne({
      where: { id: status.id },
      relations: ["health"]
    })

    const statusEnergy = await this.repository.findOne({
      where: { id: status.id },
      relations: ["energy"]
    })

    if(!statusHealth || !statusEnergy) { return null }

    return { health: statusHealth.health, energy: statusEnergy.energy }
  }

  async setInitials(status: PlayerStatus, first: string, second: string) {
    
    const updatedValues: UpdateStatusValues = {};

    updatedValues[first] = 8;
    updatedValues[second] = 8;

    await this.repository.update(status.id, updatedValues)

    if(first === "vigor" || second === "vigor") {
      const max = setMaxHealth(8, 1)
      const barsService = new BarsService()
      await barsService.updateMax(status, "health", max)
      await barsService.fullHeal(status, "health")
    }

    if(first === "presence" || second === "presence") {
      const max = setMaxEnergy(8, 1)
      const barsService = new BarsService()
      await barsService.updateMax(status, "energy", max)
      await barsService.fullHeal(status, "energy")
    }

    if(first === "intelligence" || second === "intelligence") {
      await this.repository.update({ id: status.id }, { armor: 8 })
    }

  }

  async upPoints(player: Player, status: PlayerStatus, point: string) {
    await this.repository.increment({ id: status.id }, point, 2)

    if(point === "vigor") {
      const updatedStatus = await this.repository.findOne({where: { id: status.id }})
      if(!updatedStatus) { return } 

      const barsService = new BarsService()
      const bars = await this.getBars(status)
      if(!bars) { return }

      const percent = ((updatedStatus.vigor - (updatedStatus.vigor - 2)) / (updatedStatus.vigor - 2)) * 100
      const newMax = bars.health.max * (1 + percent / 100)
      const newCurrent = bars.health.current * (1 + percent / 100)

      await barsService.updateMax(status, "health", Math.round(newMax + player.level))
      await barsService.heal(status, "health", Math.round(newCurrent - bars.health.current))
    }

    if(point === "presence") {
      const updatedStatus = await this.repository.findOne({where: { id: status.id }})
      if(!updatedStatus) { return } 

      const barsService = new BarsService()
      const bars = await this.getBars(status)
      if(!bars) { return }

      const percent = ((updatedStatus.presence - (updatedStatus.presence - 2)) / (updatedStatus.presence - 2)) * 100
      const newMax = bars.energy.max * (1 + percent / 100)
      const newCurrent = bars.energy.current * (1 + percent / 100)

      await barsService.updateMax(status, "energy", newMax)
      await barsService.heal(status, "energy", newCurrent - bars.energy.current)
    }

    if(point === "intelligence") { await this.repository.increment({ id: status.id }, 'armor', 2) }
  }

}