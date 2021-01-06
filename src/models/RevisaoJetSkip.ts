import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('revisaojetski')
export default class RevisaoJetSkip {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  lancha: string;

  @Column()
  date: string;

  @Column()
  hora: string;

  @Column()
  responsavel: string;

  @Column()
  revisao: string;

  @Column()
  tecnico: string;

}