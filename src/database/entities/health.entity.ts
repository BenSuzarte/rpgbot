import { Entity, OneToOne } from "typeorm";
import { PlayerStatus } from "./status.entity.js";
import { Bars } from "./exports/bars.export-entity.js";

@Entity()
export class Health extends Bars {

  @OneToOne(() => PlayerStatus, (status) => status.health)
  status: PlayerStatus

}