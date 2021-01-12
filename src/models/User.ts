import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity("users")
export default class Users {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  master: boolean;

  @Column()
  employee: boolean;

  @Column()
  password: string;

  @Column()
  token: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @Column()
  phone: string;
}
