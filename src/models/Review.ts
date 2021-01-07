import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("reviews")
export default class Reviews {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  vesselId: number;

  @Column()
  lastReview: Date;

  @Column()
  engineHour: string;

  @Column()
  firm: string;

  @Column()
  nextReview: Date;

  @Column()
  expert: string;

  @Column()
  created: Date;
}
