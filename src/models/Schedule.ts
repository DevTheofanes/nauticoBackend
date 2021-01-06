import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules")
export default class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  vesselId: number;

  @Column()
  time: Date;

  @Column()
  comments: string;
}
