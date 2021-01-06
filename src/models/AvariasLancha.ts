import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('avariaslancha')
export default class Avariaslancha{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  obs: string;

}