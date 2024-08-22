import { Entity, OneToOne } from "typeorm";
import { PlayerStatus } from "./status.entity.js";
import { Int } from "database/utils.js";
import { Bars } from "./exports/bars.export-entity.js";

@Entity()
export class Energy extends Bars {

  @OneToOne(() => PlayerStatus, (status) => status.energy)
  status: PlayerStatus

  @Int({ default: 1 })
  natural: number

  @Int({ default: 1 })
  spiritual: number

}