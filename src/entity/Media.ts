import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToMany
} from "typeorm";
import { Game } from "./Game";

@Entity()
export class Media {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => Game, game => game.media)
    games: Game[];

}