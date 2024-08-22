import { Column, ColumnOptions, PrimaryGeneratedColumn } from "typeorm";

export function Identity() {
  return PrimaryGeneratedColumn('identity')
}

export function String(options?: ColumnOptions) {
  return Column({
    type: "text",
    nullable: false,
    ... options
  })
}

export function Int(options?: ColumnOptions) {
  return Column({
    type: "int",
    nullable: false,
    ... options
  })
}

export function Money(options?: ColumnOptions) {
  return Column({
    type: "numeric",
    precision: 10,
    scale: 2,
    nullable: false,
    ... options
  })
}

