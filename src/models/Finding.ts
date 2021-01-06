import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("findings")
export default class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  vesselId: number;

  @Column()
  found: Date;

  @Column()
  comments: string;

  @Column()
  name: string;

  @Column()
  rg: string;

  @Column()
  delivered: Date;
}
