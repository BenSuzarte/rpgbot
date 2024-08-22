import { Int } from "database/utils.js";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bars {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Int()
  max: number

  @Int()
  current: number

}