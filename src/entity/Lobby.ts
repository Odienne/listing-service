import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn, 
    ManyToOne,
    OneToMany,
    JoinTable
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
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
    creationDate: Date;

    @Column()
    statut: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => User, user => user.lobby)
    users: User[];

}