import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('embarcacoesjetski')
export default class Embarcacoesjetski {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  proprietario: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  ano: string;

  @Column()
  comprimentototal: string;

  @Column()
  motor: string;

  @Column()
  combustivel: string;

}