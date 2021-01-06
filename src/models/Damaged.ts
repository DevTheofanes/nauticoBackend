import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import Vessel from "./Vessel";

@Entity("damaged")
export default class Damaged {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  comments: string;

  @Column()
  vesselId: number;
}
