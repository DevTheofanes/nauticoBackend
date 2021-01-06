import { Entity,Column,PrimaryGeneratedColumn }  from 'typeorm'


@Entity('agendamento')
export default class Agendamento{
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  date:string;

  @Column()
  hora:string;

  @Column()
  obs:string;

}