import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import { User } from "./User";
import { User_Game } from "./User_Game";

@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        length: 500
    })
    description: string;

    @Column()
    status: string;

    @Column()
    tour: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => User_Game, user_game => user_game.user)
    public user_game: User_Game[];

    @OneToOne(() => User)
    @JoinColumn()
    juge: User;

}