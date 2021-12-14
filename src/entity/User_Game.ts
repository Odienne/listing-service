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

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
