import { Int, Money, String } from "database/utils.js";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { PlayerStatus } from "./status.entity.js";

@Entity('player')
export class Player {

  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @String()
  name: string;

  @Int()
  age: number;

  @String({ default: "F" })
  rank: string;

  @Int({ default: 1 })
  level: number;

  @Int({ default: 0 })
  exp: number;

  @Money({ default: 20.0 })
  balance: number;

  @String()
  lore: string;

  @String()
  imageUrl: string;

  @JoinColumn()
  @OneToOne(() => PlayerStatus, (status) => status.player)
  status: PlayerStatus

}