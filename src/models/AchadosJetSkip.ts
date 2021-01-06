import { Entity,Column,PrimaryGeneratedColumn }  from 'typeorm'


@Entity('achadosjetski')
export default class AchadosJetSkip{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  date:string;

  @Column()
  obs:string;

  @Column()
  entreguei:string;

  @Column()
  name:string;

  @Column()
  rg:string;
}