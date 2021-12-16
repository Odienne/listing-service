import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, 
    OneToOne,
    OneToMany,
    JoinColumn,
    ManyToOne
} from "typeorm";
import { Game_User_Proposition } from "./Game_User_Proposition";
import { Media } from "./Media";
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

    @ManyToOne(() => Media, media => media.games)
    media: Media;

}