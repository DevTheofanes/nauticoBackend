import { Entity,Column,PrimaryGeneratedColumn }  from 'typeorm'


@Entity('achadoslancha')
export default class AchadosLancha{
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