import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';


@Entity('avariasjetski')
export default class AvariasJetSkip{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  obs:string;
}
