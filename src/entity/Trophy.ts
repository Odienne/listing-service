import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn, 
  OneToMany
} from "typeorm";
import { User_Trophy } from "./User_Trophy";

@Entity()
export class Trophy {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      length: 500
  })
  name: string;

  @Column()
  icon: string;
  
  @Column()
  description: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => User_Trophy, user_trophy => user_trophy.user)
  public user_trophy: User_Trophy[];

}