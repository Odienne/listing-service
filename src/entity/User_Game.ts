import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Unique,
    OneToMany,
} from "typeorm";
import { Game } from "./Game";
import { Game_User_Proposition } from "./Game_User_Proposition";
import { Proposition } from "./Proposition";
import { User } from "./User";

@Entity()
@Unique("user_game", ["user", "game"])
export class User_Game {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("double")
    score: number;

    @ManyToOne(type => Game, game => game.user_game, {
        onDelete: "CASCADE",
        eager: true
    })
    game: Game;

    @ManyToOne(type => User, user => user.user_game, {
        eager: true
    })
    user: User;

    @OneToMany(() => Game_User_Proposition, game_user_proposition => game_user_proposition.user_game)
    public game_user_proposition: Game_User_Proposition[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
