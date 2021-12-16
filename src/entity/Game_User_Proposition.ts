import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Unique,
} from "typeorm";
import { Game } from "./Game";
import { User } from "./User";
import { Proposition } from "./Proposition";
import { User_Game } from "./User_Game";

@Entity()
@Unique("game_user_proposition", ["user_game", "proposition"])
export class Game_User_Proposition {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User_Game, user_game => user_game.game_user_proposition, {
        eager: true
    })
    user_game: User_Game;

    @ManyToOne(type => Proposition, proposition => proposition.game_user_proposition, {
        eager: true
    })
    proposition: Proposition;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
