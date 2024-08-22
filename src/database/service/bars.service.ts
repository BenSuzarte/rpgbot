import { StatusService } from 'database/service/status.service.js';
import { AppDataSource } from "database/data-source.js"
import { Energy } from "database/entities/energy.entity.js"
import { Health } from "database/entities/health.entity.js"
import { PlayerStatus } from "database/entities/status.entity.js"
import { Repository } from "typeorm"
import { PlayerService } from "./player.service.js"
import { Player } from 'database/entities/player.entity.js';

export class BarsService {

  private readonly healthRepository: Repository<Health>
  private readonly energyRepository: Repository<Energy>
  constructor() { 
    this.healthRepository = AppDataSource.getRepository(Health)
    this.energyRepository = AppDataSource.getRepository(Energy)
  }

  async build(status: PlayerStatus) {
    const healthInitialState = 31
    const energyInitialState = 25

    const healthCreate = this.healthRepository.create({
      max: healthInitialState,
      current: healthInitialState,
      status: status
    })

    const energyCreate = this.energyRepository.create({
      max: energyInitialState,
      current: energyInitialState,
      status: status
    })

    const health = await this.healthRepository.save(healthCreate)
    const energy = await this.energyRepository.save(energyCreate)

    return { health, energy }
  }

  async updateMax(status: PlayerStatus, bar: string, max: number) { 

    const service = new StatusService()

    const bars = await service.getBars(status)
    if(!bars) { return }

    const { health, energy } = bars

    switch(bar){
      case "health":
        if(!health) { return }
        await this.healthRepository.update({ id: health.id }, { max })
        return;

      case "energy":
        if(!energy) { return }
        await this.energyRepository.update({ id: energy.id }, { max })
        return;
    }
  }

  async fullHeal(status: PlayerStatus, bar: string) {

    const service = new StatusService()
    const bars = await service.getBars(status)
    if(!bars) { return }

    const { health, energy } = bars

    switch(bar){
      case "health":
        if(!health) { return }
        await this.healthRepository.update({ id: health.id }, { current: health.max })
        return;

      case "energy":
        if(!energy) { return }
        await this.energyRepository.update({ id: energy.id }, { current: energy.max })
        return;
    }
  }

  async heal(status: PlayerStatus, bar: string, value: number) {
    const service = new StatusService()

    const bars = await service.getBars(status)
    if(!bars) { return }

    const { health, energy } = bars

    let heal = 0

    switch(bar) {
      case "health":
        if(health.max <= value + health.current) {
          heal = health.max
          await this.healthRepository.update({ id: health.id }, { current: heal })
        } else {
          await this.healthRepository.increment({ id: health.id }, 'current', value)
        }
        return

      case "energy":
        if(energy.max <= value + energy.current) {
          heal = energy.max
          await this.energyRepository.update({ id: energy.id }, { current: heal })
        } else {
          await this.energyRepository.increment({ id: energy.id }, 'current', value)
        }
        return
    }
  }

  async damage(status: PlayerStatus, bar: string, value: number) {
    const service = new StatusService()

    const bars = await service.getBars(status)
    if(!bars) { return }

    const { health, energy } = bars

    switch(bar) {
      case "health":
        if(health.current - value <= 0) {
          await this.healthRepository.update({ id: health.id }, { current: 0 })
        } else {
          await this.healthRepository.decrement({ id: health.id }, 'current', value)
        }
        return

      case "energy":
        if(energy.current - value <= 0) {
          await this.energyRepository.update({ id: energy.id }, { current: 0 })
        } else {
          await this.energyRepository.decrement({ id: energy.id }, 'current', value)
        }
        return
    }
  }

  async levelup(player: Player) {
    const playerService = new PlayerService()
    const status =await playerService.getStatus(player)
    if(!status) { return }

    const statusService = new StatusService()

    const bars = await statusService.getBars(status)
    if(!bars) { return }

    await this.healthRepository.increment({ id: bars.health.id }, 'max', 1)
    await this.healthRepository.increment({ id: bars.health.id }, 'current', 1)

    await this.energyRepository.increment({ id: bars.energy.id }, 'max', 1)
    await this.energyRepository.increment({ id: bars.energy.id }, 'current', 1)
  }

  async setArquetype(player: Player, arquetype: string) {
    
    const playerService = new PlayerService()
    const statusService = new StatusService()

    const status = await playerService.getStatus(player)
    if(!status) { return 500 }

    const bars = await statusService.getBars(status)
    if(!bars) { return 500 }
    
    switch(arquetype) {
      case "perpetrador":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 10 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 10 )
        return 200;
      case "projetista":
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 10 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 10 )
        return 200;
      case "conjurador":
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 10 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 10 )
        return 200;
      case "domador":
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 10 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 10 )
        return 200;
      case "insinuante ":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 5 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 5 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 5 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 5 )
        return 200;
      case "mediador":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 6 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 6 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 2 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 2 )
        return 200;
      case "ressabiador":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 2 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 2 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 6 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 6 )
        return 200;
      case "dificultador":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 5 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 5 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 4 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 4 )
        return 200;
      case "segurador":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 2 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 2 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 6 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 6 )
        return 200;
      case "ajudador":
        await this.healthRepository.increment({ id: bars.health.id }, 'max', 3 )
        await this.healthRepository.increment({ id: bars.health.id }, 'current', 3 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'max', 7 )
        await this.energyRepository.increment({ id: bars.energy.id }, 'current', 7 )
        return 200;
      default:
        return 404
    }
  }

}