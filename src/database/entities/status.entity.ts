import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity.js";
import { Health } from "./health.entity.js";
import { Energy } from "./energy.entity.js";
import { Int } from "database/utils.js";

@Entity()
export class PlayerStatus {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @OneToOne(() => Player, (player) => player.status)
  player: Player

  @JoinColumn()
  @OneToOne(() => Health, (health) => health.status)
  health: Health

  @JoinColumn()
  @OneToOne(() => Energy, (energy) => energy.status)
  energy: Energy

  @Int({ default: 6 })
  vigor: number

  @Int({ default: 6 })
  strength: number

  @Int({ default: 6 })
  presence: number

  @Int({ default: 6 })
  intelligence: number

  @Int({ default: 6 })
  agility: number

  @Int({ default: 6 })
  armor: number

}