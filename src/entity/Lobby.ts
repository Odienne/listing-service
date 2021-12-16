import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToMany
} from "typeorm";
import { User } from "./User";

@Entity()
export class Lobby {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 500
    })
    description: string;

    @Column()
    max_player: number;
    
    @Column()
    game_mode: string;

    @Column()
    status: string;

    @Column()
    @CreateDateColumn()
    created_date: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => User, user => user.lobby)
    users: User[];

}