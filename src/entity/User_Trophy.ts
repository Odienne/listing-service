import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Trophy } from "./Trophy";
import { User } from "./User";

@Entity()
@Unique("user_trophy", ["user", "trophy"])
export class User_Trophy {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Trophy, trophy => trophy.user_trophy, {
      onDelete: "CASCADE",
      eager: true
  })
  trophy: Trophy;

  @ManyToOne(type => User, user => user.user_trophy, {
      eager: true
  })
  user: User;

  @Column()
  obtention_date: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}
