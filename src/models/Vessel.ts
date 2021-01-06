import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("vessels")
export default class Vessels {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  jetski: boolean;

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
